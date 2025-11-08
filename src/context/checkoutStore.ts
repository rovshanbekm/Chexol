import { create } from "zustand"

export const useCheckoutStore = create((set:any) => ({
    formCheckout: {},
    setForm: (data: any) => set({ form: data }),
    clearForm: () => set({ form: {} }),
}))