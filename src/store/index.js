import { create } from "zustand"
import { createAuthSlice } from "./slices/auth-slice"

const useAppStore = create()((...a)=>({
...createAuthSlice(...a)
}))