/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { 
  useForm, 
  type UseFormProps, 
  type UseFormReturn, 
  type FieldValues 
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

/**
 * Konfigurasi opsi untuk hook {@link useSyncForm}.
 * Menggabungkan properti standar React Hook Form dengan fitur sinkronisasi store.
 * * @template T - Tipe data field values yang valid.
 */
export interface SyncFormOptions<T extends FieldValues> extends UseFormProps<T> {
  /** * Jika `true`, form akan membaca dan mengirim data ke Zustand Store secara real-time.
   * Default: `true`.
   */
  syncToStore?: boolean;
}

/**
 * Hook utilitas untuk menyinkronkan state antara React Hook Form, validasi Zod, dan Zustand Store.
 * * Hook ini sangat berguna untuk:
 * 1. **Multi-step forms**: Data tersimpan di store saat pindah step.
 * 2. **Auto-save**: Data otomatis terupdate di global state tanpa tombol submit.
 * 3. **Type-safety**: Integrasi penuh antara skema Zod dan output form.
 * * @template T - Skema Zod yang mendefinisikan struktur data form.
 * * @param useStore - Hook selector dari Zustand store yang memiliki properti `values` dan fungsi `setValues`.
 * @param schema - Objek skema Zod untuk validasi.
 * @param options - Opsi tambahan termasuk konfigurasi standar `useForm` (mode, defaultValues, dll).
 * * @returns Object {@link UseFormReturn} standar dari RHF yang sudah terintegrasi.
 * * @example
 * ```tsx
 * const schema = z.object({ name: z.string().min(3) });
 * const form = useSyncForm(useProfileStore, schema);
 * * return (
 * <form onSubmit={form.handleSubmit(d => console.log(d))}>
 * <input {...form.register('name')} />
 * {form.formState.errors.name && <span>Terlalu pendek!</span>}
 * </form>
 * );
 * ```
 */
export function useSyncForm<
  T extends z.ZodType<any, any, any>
>(
  useStore: any, 
  schema: T,
  options: SyncFormOptions<z.output<T>> = { syncToStore: true }
): UseFormReturn<z.output<T>> {
  
  const { syncToStore = true, ...rhfProps } = options;
  
  /**
   * Mengambil state dari Zustand Store.
   * Store diharapkan memiliki struktur: { values: T, setValues: (val: T) => void }
   */
  const { values, setValues } = useStore();

  const form = useForm<z.output<T>>({
    ...rhfProps,
    resolver: zodResolver(schema) as any, 
    // Jika syncToStore aktif, gunakan data dari store sebagai sumber kebenaran (source of truth)
    values: syncToStore ? (values as z.output<T>) : rhfProps.values,
  });

  const watchedValues = form.watch();

  /**
   * Efek samping untuk mengirim perubahan nilai form ke Zustand Store setiap kali ada input.
   */
  useEffect(() => {
    if (syncToStore) {
      setValues(watchedValues);
    }
  }, [watchedValues, setValues, syncToStore]);

  return form;
}