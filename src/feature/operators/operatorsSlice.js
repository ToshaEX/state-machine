import { createSlice } from "@reduxjs/toolkit";
import { addOperatorReducer,addMinorReducer,simulateReducer} from "./operator.reducer"

const initialState = {
  operatorCount: 0,
  operatorBehavior:null,
  hashRateAvg:0,
  valuationPerHash:0,
  totalpotionRate:0,
  poolOperatorAvgHash:0,
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
  },
});

export const { addOperator, addMinor, simulate } = operatorsSlice.actions;

export default operatorsSlice.reducer;
