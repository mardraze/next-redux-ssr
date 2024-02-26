import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number
  name: string
  nick: string
  email: string
}

export interface MeSliceState {
  user: User | null
}
const initialState: MeSliceState = {
  user: null
}

export const meSlice = createAppSlice({
  name: "me",
  initialState,
  reducers: (create) => ({
    setUser: create.reducer((state, action: PayloadAction<User>) => {
      state.user = action.payload
    })
  }),
  selectors: {
    selectNick: (me) => {
      return me.user?.nick
    }
  },
});

export const { selectNick } = meSlice.selectors;
export const { setUser } = meSlice.actions;
