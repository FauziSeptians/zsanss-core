import type { 
  QueryKey, 
  UseInfiniteQueryResult,
  InfiniteData
} from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

/**
 * Struktur response standar yang diharapkan dari API untuk mendukung pagination.
 * * @template T - Tipe data item yang ada di dalam array data.
 */
export interface InfiniteResponse<T> {
  /** Array berisi data utama dari halaman saat ini. */
  data: T[];
  /** * Cursor atau nomor halaman untuk memuat data berikutnya. 
   * Jika nilainya `null` atau `undefined`, pagination akan dianggap selesai.
   */
  nextCursor?: number | string | null;
}

/**
 * Konfigurasi properti untuk hook {@link useBaseInfiniteQuery}.
 * * @template T - Tipe data item dalam array.
 * @template P - Tipe data untuk parameter halaman (misal: `number` untuk offset-based atau `string` untuk cursor-based).
 */
export interface UseCustomInfiniteProps<T, P = number> {
  /** Key unik untuk keperluan caching TanStack Query. */
  queryKey: QueryKey;
  /** Fungsi asinkron untuk mengambil data dari server. */
  fetchFn: (pageParam: P) => Promise<InfiniteResponse<T>>;
  /** Parameter halaman awal. Default: `1`. */
  initialPageParam?: P;
  /** Flag untuk menentukan apakah query harus dijalankan secara otomatis atau tidak. Default: `true`. */
  enabled?: boolean;
}

/**
 * Tipe pengembalian yang memperluas fungsionalitas standar dari TanStack Query.
 * * @template T - Tipe data item.
 * @template P - Tipe data parameter halaman.
 */
export type UseBaseInfiniteReturn<T, P> = UseInfiniteQueryResult<
  InfiniteData<InfiniteResponse<T>, P>, 
  Error
> & {
  /** * **Flattened Data**: Array datar yang menggabungkan semua item dari seluruh halaman yang telah dimuat. 
   * Sangat berguna untuk melakukan mapping langsung di UI tanpa perlu manual `flatMap`.
   */
  items: T[];
  /** * **Empty State Flag**: Bernilai `true` jika loading sudah selesai dan tidak ada data sama sekali di seluruh halaman.
   */
  isEmpty: boolean;
};

/**
 * Hook kustom tingkat tinggi (High-level) untuk menangani TanStack Infinite Query dengan lebih sederhana.
 * * Hook ini mengotomatisasi proses `getNextPageParam`, melakukan perataan (flattening) data ke dalam properti `items`,
 * serta menyediakan flag `isEmpty` untuk mempermudah penanganan UI state.
 * * @template T - Tipe data item dalam array.
 * @template P - Tipe parameter halaman (default: `number`).
 * * @param props - Konfigurasi hook yang meliputi queryKey, fetchFn, dan opsi lainnya.
 * @returns Gabungan dari objek standar useInfiniteQuery ditambah properti `items` dan `isEmpty`.
 * * @example
 * ```tsx
 * const { items, fetchNextPage, hasNextPage, isLoading } = useBaseInfiniteQuery<User>({
 * queryKey: ['users'],
 * fetchFn: (page) => userService.getAll({ page }),
 * });
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