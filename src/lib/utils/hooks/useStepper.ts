import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * Interface State untuk manajemen Stepper.
 * 
 * Mendefinisikan struktur data dan fungsi kontrol yang tersedia di dalam store Stepper.
 * 
 * @template T - Tipe data string literal atau Enum yang merepresentasikan nama-nama langkah (steps).
 */
export interface StepperState<T extends string> {
  /** Daftar urutan langkah dalam bentuk array string atau enum secara berurutan. */
  steps: T[];
  /** Nama langkah (step) yang sedang aktif saat ini. */
  currentStep: T;
  /** Indeks numerik dari langkah yang sedang aktif (dimulai dari 0). */
  currentIndex: number;
  /** Total jumlah langkah yang terdaftar di dalam stepper. */
  totalSteps: number;
  /** Status boolean yang menandakan apakah pengguna berada di langkah pertama. */
  isFirstStep: boolean;
  /** Status boolean yang menandakan apakah pengguna berada di langkah terakhir. */
  isLastStep: boolean;

  /** 
   * Fungsi untuk berpindah ke langkah tertentu secara langsung berdasarkan namanya.
   * @param step - Nama langkah tujuan yang harus ada di dalam array `steps`.
   */
  setStep: (step: T) => void;
  
  /** 
   * Fungsi untuk melangkah maju ke satu langkah berikutnya.
   * Tidak akan melakukan apa-apa jika sudah berada di langkah terakhir.
   */
  nextStep: () => void;
  
  /** 
   * Fungsi untuk melangkah mundur ke satu langkah sebelumnya.
   * Tidak akan melakukan apa-apa jika sudah berada di langkah pertama.
   */
  prevStep: () => void;
  
  /** 
   * Fungsi untuk mengembalikan posisi stepper ke langkah paling awal (indeks 0).
   */
  resetStepper: () => void;
}

/**
 * Factory untuk membuat Custom Hook Stepper yang terisolasi dan Type-Safe.
 * 
 * Menggunakan Zustand secara internal untuk manajemen state global atau lokal komponen. 
 * Sangat berguna untuk alur kerja multi-step seperti pendaftaran atau wizard.
 * 
 * @template T - Tipe string literal dari urutan langkah.
 * @param stepsArray - Array konstan yang mendefinisikan urutan langkah dari awal hingga akhir.
 * @returns Hook Zustand yang mengembalikan state dan aksi {@link StepperState}.
 * 
 * @example
 * ```tsx
 * // 1. Definisikan urutan langkah dengan 'as const'
 * export const PendaftaranSteps = [
 *   'DATA_DIRI',
 *   'VERIFIKASI_EMAIL',
 *   'SELESAI'
 * ] as const;
 * 
 * // 2. Ekstrak tipe untuk koordinasi komponen
 * export type PendaftaranStep = (typeof PendaftaranSteps)[number];
 * 
 * // 3. Buat hook menggunakan factory
 * export const usePendaftaranStepper = createStepper<PendaftaranStep>([...PendaftaranSteps]);
 * 
 * // 4. Penggunaan di dalam komponen
 * const { currentStep, nextStep, isFirstStep } = usePendaftaranStepper();
 * ```
 */
export const createStepper = <T extends string>(stepsArray: T[]) => {
  return create<StepperState<T>>()(
    devtools(
      (set, get) => ({
        steps: stepsArray,
        currentStep: stepsArray[0],
        currentIndex: 0,
        totalSteps: stepsArray.length,
        isFirstStep: true,
        isLastStep: stepsArray.length === 1,

        setStep: (step) => {
          const index = get().steps.indexOf(step);
          if (index !== -1) {
            set(
              {
                currentStep: step,
                currentIndex: index,
                isFirstStep: index === 0,
                isLastStep: index === get().totalSteps - 1,
              },
              false,
              `setStep: ${step}`
            );
          }
        },

        nextStep: () => {
          const { currentIndex, steps, totalSteps } = get();
          if (currentIndex < totalSteps - 1) {
            get().setStep(steps[currentIndex + 1]);
          }
        },

        prevStep: () => {
          const { currentIndex, steps } = get();
          if (currentIndex > 0) {
            get().setStep(steps[currentIndex - 1]);
          }
        },

        resetStepper: () => get().setStep(stepsArray[0]),
      }),
      { name: 'StepperStore' }
    )
  );
};