/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState } from 'react';
import { useQuery, type QueryKey } from '@tanstack/react-query';

/**
 * Arah pengurutan data: 'asc' untuk urutan menaik, 'desc' untuk urutan menurun.
 */
type SortDirection = 'asc' | 'desc';

/**
 * Representasi satu aturan pengurutan untuk kolom tertentu.
 * 
 * @template T - Tipe data objek entitas yang sedang dikelola.
 */
interface SortRule<T> {
  /** Nama properti (field) yang diurutkan. */
  key: keyof T;
  /** Arah pengurutan ('asc' atau 'desc'). */
  direction: SortDirection;
}

/**
 * Properti untuk konfigurasi hook {@link useDataTableMultiQuery}.
 * 
 * @template T - Tipe data item dalam tabel.
 */
interface UseDataTableMultiProps<T> {
  /** Key unik yang digunakan TanStack Query untuk keperluan caching. */
  queryKey: QueryKey;
  /** 
   * Fungsi untuk mengambil data dari server.
   * @param params - Objek yang berisi query `search` dan daftar aturan pengurutan `sorts`.
   */
  fetchFn: (params: { search: string; sorts: SortRule<T>[] }) => Promise<T[]>;
}

/**
 * Hook untuk mengelola state tabel yang mendukung pencarian dan pengurutan multi-kolom
 * yang terintegrasi langsung dengan TanStack Query (Server-side).
 * 
 * Hook ini menangani state pencarian, state pengurutan (termasuk multi-select), 
 * serta otomatis melakukan fetch ulang ketika parameter berubah.
 * 
 * @template T - Tipe data item dalam tabel.
 * @param props - Objek konfigurasi yang meliputi `queryKey` dan `fetchFn`.
 * @returns Objek yang berisi state query, data yang sudah di-fetch, dan fungsi kontrol tabel.
 * 
 * @example
 * ```tsx
 * const { data, requestSort, getSortDirection, getSortOrder } = useDataTableMultiQuery<User>({
 *   queryKey: ['users'],
 *   fetchFn: ({ search, sorts }) => userService.getAll({ search, sorts })
 * });
 * 
 * // Di dalam render:
 * <th onClick={(e) => requestSort('name', e.shiftKey)}>
 *   Nama {getSortDirection('name') === 'asc' ? '↑' : '↓'} 
 *   {getSortOrder('name') > 0 && <span>({getSortOrder('name')})</span>}
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
   * 
   * Logika Pengurutan:
   * 1. Jika `multiSelect` (Shift+Click) bernilai `false`: Mereset semua sort dan hanya menggunakan kolom ini.
   * 2. Jika `multiSelect` bernilai `true`: 
   *    - Jika kolom belum ada: Menambahkan ke daftar urutan paling belakang.
   *    - Jika kolom sudah 'asc': Mengubah arah menjadi 'desc'.
   *    - Jika kolom sudah 'desc': Menghapus kolom tersebut dari daftar pengurutan.
   * 
   * @param key - Properti objek yang ingin diurutkan.
   * @param multiSelect - Flag untuk mengaktifkan multi-sorting (biasanya dari `event.shiftKey`).
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
    /** Data hasil fetch, default mengembalikan array kosong jika belum ada data. */
    data: query.data ?? [],
    /** State pencarian saat ini. */
    search,
    /** Fungsi untuk memperbarui state pencarian. */
    setSearch,
    /** Daftar aturan pengurutan kolom yang aktif saat ini. */
    sorts,
    /** Fungsi untuk memicu pengurutan (sort) pada kolom tertentu. */
    requestSort,
    /** 
     * Mendapatkan arah pengurutan saat ini untuk kolom tertentu.
     * @param key - Nama kolom yang ingin diperiksa.
     * @returns 'asc', 'desc', atau undefined jika tidak diurutkan.
     */
    getSortDirection: (key: keyof T) => sorts.find((s) => s.key === key)?.direction,
    /** 
     * Mendapatkan nomor urutan prioritas kolom dalam sistem multi-sorting.
     * @param key - Nama kolom yang ingin diperiksa.
     * @returns Angka urutan (1, 2, dst) atau 0 jika kolom tidak masuk dalam pengurutan.
     */
    getSortOrder: (key: keyof T) => sorts.findIndex((s) => s.key === key) + 1,
  };
}