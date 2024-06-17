import { createSlice } from "@reduxjs/toolkit";
import { addOperatorReducer,addMinorReducer,simulateReducer, minorCreationReducer} from "./operator.reducer"

const initialState = {
  operatorCount: 0,
  operatorBehavior:null,
  minorsTotal: 0,
  operators: [],
  prevOperators: [],
};

export const operatorsSlice = createSlice({
  name: "operator",
  initialState,
  reducers: {
  addOperator:addOperatorReducer,
    addMinor: addMinorReducer,
    simulate: simulateReducer,
    // minerCreation:minorCreationReducer,
  },
});

export const { addOperator, addMinor, simulate } = operatorsSlice.actions;

export default operatorsSlice.reducer;
