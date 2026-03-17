import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * Interface State untuk Stepper.
 * @template T - Tipe data string literal atau Enum untuk nama-nama step.
 */
export interface StepperState<T extends string> {
  /** Daftar urutan langkah dalam bentuk array string/enum. */
  steps: T[];
  /** Nama langkah yang aktif saat ini. */
  currentStep: T;
  /** Index numerik dari langkah aktif (dimulai dari 0). */
  currentIndex: number;
  /** Total jumlah langkah yang terdaftar. */
  totalSteps: number;
  /** Status apakah berada di langkah paling awal. */
  isFirstStep: boolean;
  /** Status apakah berada di langkah paling akhir. */
  isLastStep: boolean;

  /** * Berpindah ke langkah tertentu berdasarkan nama langkah.
   * @param step - Nama langkah tujuan (harus ada di dalam array steps).
   */
  setStep: (step: T) => void;
  
  /** * Melangkah maju ke step berikutnya secara otomatis.
   * Tidak akan mengeksekusi jika sudah di step terakhir.
   */
  nextStep: () => void;
  
  /** * Melangkah mundur ke step sebelumnya secara otomatis.
   * Tidak akan mengeksekusi jika sudah di step pertama.
   */
  prevStep: () => void;
  
  /** * Mengembalikan posisi stepper ke langkah pertama.
   */
  resetStepper: () => void;
}

/**
 * Factory untuk membuat Custom Hook Stepper yang terisolasi dan Type-Safe.
 * Menggunakan Zustand di balik layar untuk manajemen state.
 * * @template T - Tipe string literal dari urutan step.
 * @param stepsArray - Array konstan yang mendefinisikan urutan langkah.
 * * @example
 * // 1. Definisikan urutan step dengan 'as const' untuk Type-Safety maksimal
 * export const KYC_STEPS = [
 * 'UPLOAD_KTP',
 * 'FACE_RECOGNITION',
 * 'PERSONAL_DATA',
 * 'REVIEW'
 * ] as const;
 * * // 2. Ekstrak tipenya agar bisa dipakai di prop komponen lain
 * export type KycStep = (typeof KYC_STEPS)[number];
 * * // 3. Buat hook kustom menggunakan factory
 * export const useKycStepper = createStepper<KycStep>([...KYC_STEPS]);
 * * // 4. Penggunaan di dalam komponen
 * const { currentStep, nextStep, isLastStep } = useKycStepper();
 * * @returns Zustand Hook yang berisi state {@link StepperState}.
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