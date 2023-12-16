import animalSlice from "./features/animal/animalSlice";
import { configureStore } from "@reduxjs/toolkit";
import shelterSlice from "./features/shelter/shelterSlice";
import userSlice from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    animal: animalSlice,
    shelter: shelterSlice,
  },
});
