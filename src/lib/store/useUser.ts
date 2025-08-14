import { getUserLoggedProfile } from "@/services/auth-services";
import { User } from "@/types/user";
import { create } from "zustand";

interface UserState {
  // Ubah dari users array menjadi single user dan loading state
  user: User | null;
  users: User[]; // Tetap pertahankan jika dibutuhkan untuk data lain
  loading: boolean;
  error: string | null;

  setUser: (user: User | null) => void;
  setMovieUser: (user: User[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  fetchUserLoggedProfile: (token: string) => Promise<void>;
}

export const useUsers = create<UserState>((set, get) => ({
  user: null,
  users: [],
  loading: false,
  error: null,

  setUser: (user) => set({ user }),
  setMovieUser: (users) => set({ users }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  fetchUserLoggedProfile: async (token: string) => {
    set({ loading: true, error: null });

    try {
      const userData = await getUserLoggedProfile(token);

      // Jika API mengembalikan single user object
      if (
        userData &&
        typeof userData === "object" &&
        !Array.isArray(userData)
      ) {
        set({ user: userData, loading: false });
      }
      // Jika API mengembalikan array users
      else if (Array.isArray(userData)) {
        set({ users: userData, user: userData[0] || null, loading: false });
      } else {
        console.warn("Unexpected data format:", userData);
        set({ loading: false, error: "Unexpected data format" });
      }
    } catch (error) {
      console.error("Error in fetchUserLoggedProfile:", error);
      set({
        loading: false,
        error: error instanceof Error ? error.message : "Unknown error",
        user: null,
      });
    }
  },
}));
