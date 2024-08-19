// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export const createAuthSlice = (set) => ({
//   userInfo: undefined,
//   setUserInfo: (userInfo) => {
//     console.log("Setting userInfo:", userInfo);
//     set({ userInfo });
//   }
// });

// export const useAppStore = create(
//   persist(
//     (set) => ({
//       userInfo: undefined,
//       setUserInfo: (userInfo) => set({ userInfo }),
//     }),
//     {
//       name: "user-info", // unique name for storage in localStorage
//       getStorage: () => localStorage, // or sessionStorage if you prefer
//     }
//   )
// );


import { persist } from 'zustand/middleware';

export const createAuthSlice = persist(
  (set) => ({
    userInfo: undefined,
    profileSetup: false,

    setUserInfo: (userInfo) => {
      console.log("Setting userInfo:", userInfo);  // Debugging line
      set({
        userInfo,
        profileSetup: !!userInfo?.profileSetup, // Update profileSetup based on userInfo
      });
    },

    setProfileSetup: (status) => {
      set({ profileSetup: status });
    },
  }),
  {
    name: 'profile-setup', // Key for localStorage
    getStorage: () => localStorage, // Use localStorage to persist the data
    partialize: (state) => ({ profileSetup: state.profileSetup }), // Only persist the profileSetup flag
  }
);

