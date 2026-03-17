import type { 
  QueryKey, 
  UseInfiniteQueryResult,
  InfiniteData
} from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

/**
 * Struktur response standar untuk API pagination.
 */
export interface InfiniteResponse<T> {
  data: T[];
  nextCursor?: number | string | null;
}

/**
 * Properti untuk hook useBaseInfiniteQuery.
 */
interface UseCustomInfiniteProps<T, P = number> {
  queryKey: QueryKey;
  fetchFn: (pageParam: P) => Promise<InfiniteResponse<T>>;
  initialPageParam?: P;
  enabled?: boolean;
}

/**
 * Menggunakan Type Alias dengan Intersection untuk menggabungkan tipe TanStack dan properti kustom.
 */
type UseBaseInfiniteReturn<T, P> = UseInfiniteQueryResult<
  InfiniteData<InfiniteResponse<T>, P>, 
  Error
> & {
  /** Array datar berisi seluruh item dari semua halaman yang telah dimuat. */
  items: T[];
  /** Flag yang menandakan dataset kosong setelah loading selesai. */
  isEmpty: boolean;
};

/**
 * Hook kustom untuk TanStack Infinite Query yang disederhanakan.
 * * @template T - Tipe data item dalam array.
 * @template P - Tipe parameter halaman (default: number).
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