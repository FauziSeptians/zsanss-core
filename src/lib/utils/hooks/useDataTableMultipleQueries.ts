/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState } from 'react';
import { useQuery, type QueryKey } from '@tanstack/react-query';

/**
 * Arah pengurutan data.
 */
type SortDirection = 'asc' | 'desc';

/**
 * Representasi satu aturan pengurutan untuk kolom tertentu.
 * @template T Tipe data objek entitas.
 */
interface SortRule<T> {
  /** Nama properti yang diurutkan. */
  key: keyof T;
  /** Arah pengurutan (asc atau desc). */
  direction: SortDirection;
}

/**
 * Properti untuk hook useDataTableMultiQuery.
 */
interface UseDataTableMultiProps<T> {
  /** Key unik untuk TanStack Query guna keperluan caching. */
  queryKey: QueryKey;
  /** * Fungsi untuk mengambil data dari server.
   * @param params Objek yang berisi query pencarian dan daftar aturan pengurutan.
   */
  fetchFn: (params: { search: string; sorts: SortRule<T>[] }) => Promise<T[]>;
}

/**
 * Hook untuk mengelola state tabel yang mendukung pencarian dan pengurutan multi-kolom
 * yang terintegrasi langsung dengan TanStack Query (Server-side).
 * * @template T Tipe data item dalam tabel.
 * @param props Objek konfigurasi {@link UseDataTableMultiProps}.
 * * @returns Objek yang berisi state query, data yang sudah di-fetch, dan fungsi kontrol tabel.
 * * @example
 * ```tsx
 * const { data, requestSort, getSortDirection, getSortOrder } = useDataTableMultiQuery<User>({
 * queryKey: ['users'],
 * fetchFn: ({ search, sorts }) => userService.getAll({ search, sorts })
 * });
 * * // Di dalam render:
 * <th onClick={(e) => requestSort('name', e.shiftKey)}>
 * Nama {getSortDirection('name')} {getSortOrder('name') > 0 && `(${getSortOrder('name')})`}
 * </th>
 * ```
 */
export function useDataTableMultiQuery<T>({
  queryKey,
  fetchFn,
}: UseDataTableMultiProps<T>) {
  /** State untuk query pencarian teks. */
  const [search, setSearch] = useState('');
  
  /** State array untuk menampung daftar urutan kolom (Multi-sorting). */
  const [sorts, setSorts] = useState<SortRule<T>[]>([]);

  /** Integrasi dengan TanStack Query. Otomatis fetch ulang jika search atau sorts berubah. */
  const query = useQuery({
    queryKey: [...queryKey, search, sorts],
    queryFn: () => fetchFn({ search, sorts }),
    placeholderData: (prev) => prev,
  });

  /**
   * Menangani permintaan pengurutan pada kolom tertentu.
   * * Logika:
   * 1. Jika `multiSelect` false: Reset semua sort dan hanya gunakan kolom ini.
   * 2. Jika `multiSelect` true: 
   * - Jika kolom belum ada: Tambahkan ke daftar.
   * - Jika kolom sudah 'asc': Ubah ke 'desc'.
   * - Jika kolom sudah 'desc': Hapus dari daftar (reset kolom tersebut).
   * * @param key Properti objek yang ingin diurutkan.
   * @param multiSelect Jika true (misal via Shift+Click), urutan kolom lain tidak akan dihapus.
   */
  const requestSort = (key: keyof T, multiSelect: boolean = false) => {
    setSorts((prev) => {
      const existingIndex = prev.findIndex((s) => s.key === key);
      const newSorts = multiSelect ? [...prev] : [];

      if (existingIndex > -1) {
        const current = prev[existingIndex];
        if (current.direction === 'asc') {
          const updatedRule = { ...current, direction: 'desc' as const };
          multiSelect ? (newSorts[existingIndex] = updatedRule) : newSorts.push(updatedRule);
        } else {
          if (multiSelect) newSorts.splice(existingIndex, 1);
        }
      } else {
        newSorts.push({ key, direction: 'asc' });
      }
      return newSorts;
    });
  };

  return {
    ...query,
    /** Data hasil fetch (default ke array kosong). */
    data: query.data ?? [],
    /** State pencarian. */
    search,
    /** Fungsi untuk mengubah state pencarian. */
    setSearch,
    /** Daftar aturan pengurutan aktif saat ini. */
    sorts,
    /** Fungsi untuk memicu pengurutan pada header tabel. */
    requestSort,
    /** * Mendapatkan arah sort kolom tertentu. 
     * @param key Nama kolom.
     */
    getSortDirection: (key: keyof T) => sorts.find((s) => s.key === key)?.direction,
    /** * Mendapatkan nomor urutan prioritas kolom dalam sorting.
     * @param key Nama kolom.
     * @returns Angka urutan (1, 2, dst) atau 0 jika tidak diurutkan.
     */
    getSortOrder: (key: keyof T) => sorts.findIndex((s) => s.key === key) + 1,
  };
}