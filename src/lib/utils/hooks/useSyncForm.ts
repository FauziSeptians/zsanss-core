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
 * 
 * Menggabungkan properti standar dari React Hook Form (`UseFormProps`) dengan 
 * fitur tambahan untuk sinkronisasi state ke store eksternal.
 * 
 * @template T - Tipe data field values yang valid dan sesuai dengan skema form.
 */
export interface SyncFormOptions<T extends FieldValues> extends UseFormProps<T> {
  /** 
   * Jika bernilai `true`, form akan secara otomatis membaca dan mengirimkan pembaruan 
   * data ke Zustand Store secara real-time setiap kali ada perubahan input. 
   * Default: `true`.
   */
  syncToStore?: boolean;
}

/**
 * Hook utilitas untuk menyinkronkan state antara React Hook Form, validasi Zod, dan Zustand Store.
 * 
 * Hook ini sangat efektif digunakan pada skenario berikut:
 * 1. **Multi-step forms**: Menjaga data tetap aman di store global saat pengguna berpindah antar langkah.
 * 2. **Auto-save**: Memperbarui state global secara otomatis tanpa memerlukan interaksi tombol submit.
 * 3. **Type-safety**: Integrasi yang sangat ketat antara skema Zod dengan output fungsional form.
 * 
 * @template T - Skema Zod yang mendefinisikan struktur, validasi, dan tipe data form.
 * 
 * @param useStore - Hook selector dari Zustand store yang wajib memiliki properti `values` dan fungsi `setValues`.
 * @param schema - Objek skema Zod yang akan digunakan untuk validasi input.
 * @param options - Opsi konfigurasi tambahan yang mencakup pengaturan `useForm` standar.
 * @returns Objek {@link UseFormReturn} dari React Hook Form yang sudah terintegrasi dengan store.
 * 
 * @example
 * ```tsx
 * const schema = z.object({ 
 *   userName: z.string().min(3, "Minimal 3 karakter") 
 * });
 * 
 * const form = useSyncForm(useProfileStore, schema);
 * 
 * return (
 *   <form onSubmit={form.handleSubmit(data => console.log(data))}>
 *     <input {...form.register('userName')} />
 *     {form.formState.errors.userName && (
 *       <span>{form.formState.errors.userName.message}</span>
 *     )}
 *     <button type="submit">Simpan</button>
 *   </form>
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