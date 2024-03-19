import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserState = {
  user: {
    email?: string;
  };
  saveUser: (useremail: string) => void;
  removeUser: () => void;
};

export const useUser = create<UserState>()(
  persist(
    (set) => ({
      user: {},
      saveUser: (useremail) =>
        set(() => {
          return {
            user: {
              email: useremail,
            },
          };
        }),
      removeUser: () =>
        set(() => {
          return {
            user: {},
          };
        }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
