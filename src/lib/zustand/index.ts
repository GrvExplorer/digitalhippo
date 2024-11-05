import { create } from "zustand";

export const useStore = create((set) => ({
  count: 0,
  inc: () => set((state: any) => ({ count: state.count + 1 })),
  dec: () => set((state: any) => ({ count: state.count - 1 })),
  reset: () => set(() => ({ count: 0 })),
}));

export const useErrorMessage = create((set) => ({
  errorMessage: "",
  setErrorMessage: (message: string) => set(() => ({ errorMessage: message })),
}));

export const useSuccessMessage = create((set) => ({
  successMessage: "",
  setSuccessMessage: (message: string) => set(() => ({ successMessage: message })),
}));
