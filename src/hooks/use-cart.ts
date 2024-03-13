import { Product } from "@/payload/payload-types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  product: Product;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          return {
            items: [...state.items, { product: product }],
          };
        }),
      removeItem: (productId) =>
        set((state) => {
          return {
            items: state.items.filter(({ product }) => {
              return product.id !== productId;
            }),
          };
        }),
      clearCart: () =>
        set((state) => {
          return {
            items: [],
          };
        }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
