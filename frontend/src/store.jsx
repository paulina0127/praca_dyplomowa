import animalSlice from "./features/animal/animalSlice";
import applicationSlice from "./features/application/applicationSlice";
import breedSlice from "./features/breed/breedSlice";
import { configureStore } from "@reduxjs/toolkit";
import shelterSlice from "./features/shelter/shelterSlice";
import userSlice from "./features/user/userSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    animal: animalSlice,
    breed: breedSlice,
    shelter: shelterSlice,
    application: applicationSlice,
  },
});
