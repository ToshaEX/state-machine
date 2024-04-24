import { configureStore } from "@reduxjs/toolkit";
import operatorsReducer from "../feature/operators/operatorsSlice";

export default configureStore({
  reducer: {
    operator: operatorsReducer,
  },
});
