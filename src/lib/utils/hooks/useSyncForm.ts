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
 * Memastikan T mematuhi FieldValues (objek).
 */
export interface SyncFormOptions<T extends FieldValues> extends UseFormProps<T> {
  syncToStore?: boolean;
}

/**
 * Hook untuk sinkronisasi RHF, Zod, dan Zustand.
 * * @template T - Skema Zod yang harus merupakan turunan dari ZodTypeDef yang menghasilkan objek.
 */
export function useSyncForm<
  T extends z.ZodType<any, any, any>
>(
  useStore: any, // Disarankan mengganti 'any' dengan interface store yang spesifik
  schema: T,
  options: SyncFormOptions<z.output<T>> = { syncToStore: true }
): UseFormReturn<z.output<T>> {
  
  const { syncToStore = true, ...rhfProps } = options;
  
  // Ambil state dari Zustand Store
  const { values, setValues } = useStore();

  // Kita gunakan z.output<T> karena RHF bekerja dengan data hasil akhir (output)
  const form = useForm<z.output<T>>({
    ...rhfProps,
    // Kita paksa resolver menggunakan tipe yang sesuai dengan output schema
    resolver: zodResolver(schema) as any, 
    values: syncToStore ? (values as z.output<T>) : rhfProps.values,
  });

  const watchedValues = form.watch();

  /**
   * Mengirim perubahan ke Zustand Store secara real-time.
   */
  useEffect(() => {
    if (syncToStore) {
      setValues(watchedValues);
    }
  }, [watchedValues, setValues, syncToStore]);

  return form;
}