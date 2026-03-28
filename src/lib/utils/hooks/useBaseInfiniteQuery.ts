import type { 
  QueryKey, 
  UseInfiniteQueryResult,
  InfiniteData
} from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

/**
 * Struktur response standar yang diharapkan dari API untuk mendukung pagination berbasis cursor atau offset.
 * 
 * @template T - Tipe data item yang ada di dalam array `data`.
 */
export interface InfiniteResponse<T> {
  /** Array berisi data utama dari halaman saat ini. */
  data: T[];
  /** 
   * Cursor atau nomor halaman untuk memuat data berikutnya. 
   * Jika nilainya `null` atau `undefined`, proses pagination akan dianggap selesai.
   */
  nextCursor?: number | string | null;
}

/**
 * Konfigurasi properti untuk hook {@link useBaseInfiniteQuery}.
 * 
 * @template T - Tipe data item dalam array.
 * @template P - Tipe data untuk parameter halaman (misal: `number` untuk berbasis offset atau `string` untuk berbasis cursor).
 */
export interface UseCustomInfiniteProps<T, P = number> {
  /** Key unik yang digunakan TanStack Query untuk keperluan caching dan identifikasi query. */
  queryKey: QueryKey;
  /** Fungsi asinkron untuk mengambil data dari server berdasarkan parameter halaman (`pageParam`). */
  fetchFn: (pageParam: P) => Promise<InfiniteResponse<T>>;
  /** Parameter halaman awal yang akan dikirim pada pemanggilan pertama. Default: `1`. */
  initialPageParam?: P;
  /** Menentukan apakah query harus dijalankan secara otomatis saat komponen dimuat. Default: `true`. */
  enabled?: boolean;
}

/**
 * Tipe pengembalian yang memperluas fungsionalitas standar dari `UseInfiniteQueryResult`.
 * 
 * Menambahkan properti kenyamanan seperti perataan data (`items`) dan status kekosongan (`isEmpty`).
 * 
 * @template T - Tipe data item.
 * @template P - Tipe data parameter halaman.
 */
export type UseBaseInfiniteReturn<T, P> = UseInfiniteQueryResult<
  InfiniteData<InfiniteResponse<T>, P>, 
  Error
> & {
  /** 
   * Array datar yang menggabungkan semua item dari seluruh halaman yang telah berhasil dimuat. 
   * Memudahkan proses rendering langsung di UI tanpa perlu melakukan `flatMap` secara manual.
   */
  items: T[];
  /** 
   * Bernilai `true` jika proses pemuatan data telah selesai dan tidak ditemukan item sama sekali di seluruh halaman.
   */
  isEmpty: boolean;
};

/**
 * Hook kustom tingkat tinggi (High-level) untuk menangani TanStack Infinite Query dengan lebih sederhana.
 * 
 * Hook ini mengotomatisasi konfigurasi `getNextPageParam`, melakukan perataan data (flattening) ke 
 * dalam properti `items`, serta menyediakan flag `isEmpty` untuk mempermudah penanganan status UI.
 * 
 * @template T - Tipe data item dalam array.
 * @template P - Tipe parameter halaman. Default: `number`.
 * 
 * @param props - Objek konfigurasi yang meliputi `queryKey`, `fetchFn`, dan opsi tambahan lainnya.
 * @returns Objek gabungan dari standar `useInfiniteQuery` ditambah properti `items` dan `isEmpty`.
 * 
 * @example
 * ```tsx
 * const { items, fetchNextPage, hasNextPage, isLoading } = useBaseInfiniteQuery<User>({
 *   queryKey: ['users'],
 *   fetchFn: (page) => userService.getAll({ page }),
 * });
 * 
 * return (
 *   <ul>
 *     {items.map(user => <li key={user.id}>{user.name}</li>)}
 *   </ul>
 * );
 * ```
 */
export function useBaseInfiniteQuery<T, P = number>({
  queryKey,
  fetchFn,
  initialPageParam = 1 as unknown as P,
  enabled = true,
}: UseCustomInfiniteProps<T, P>): UseBaseInfiniteReturn<T, P> {
  
  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => fetchFn(pageParam as P),
    initialPageParam,
    getNextPageParam: (lastPage) => (lastPage.nextCursor as P | undefined) ?? undefined,
    enabled,
  });

  const items = query.data?.pages.flatMap((page) => page.data) ?? [];

  return {
    ...query,
    items,
    isEmpty: !query.isLoading && items.length === 0,
  } as UseBaseInfiniteReturn<T, P>;
}