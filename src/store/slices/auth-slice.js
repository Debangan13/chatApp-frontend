
export const createAuthSlice = (set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo) => {
    console.log("Setting userInfo:", userInfo);
    set({ userInfo });
  }
});



