import { createSlice } from "@reduxjs/toolkit";

const findAverage = (operator) => {
  let totalMiners = 0;
  let totalHashRate = 0;
  let totalValuation = 0;

  for (let i = 0; i < operator.length; i++) {
    for (let j = 0; j < operator[i].minors.length; j++) {
      totalMiners++;
      totalHashRate = totalHashRate + operator[i].minors[j].hashRate;
      totalValuation = totalValuation + operator[i].minors[j].valuation;
    }
  }

  return {
    hashRateAvg: totalHashRate / totalMiners,
    valuationPerHash: totalValuation / totalHashRate,
  };
};

const initialState = {
  operatorCount: 0,
  minorsTotal: 0,
  operators: [],
  prevOperators: [],
};

const addMinorAction = (state, { payload }) => {
  const operator = state.operators.find((ele) => ele.id === payload.operatorId);
  const operatorArr = state.operators.filter(
    (ele) => ele.id !== payload.operatorId,
  );

  operator.minors = [...operator.minors, { ...payload.minorData }];

  state.minorsTotal = state.minorsTotal + 1;
  state.operators = [...operatorArr, operator];
};

const simulateAction = async (state) => {
  state.prevOperators = [...state.operators];
  const { hashRateAvg, valuationPerHash } = findAverage(state.operators);

  console.log(hashRateAvg, valuationPerHash);
};

export const operatorsSlice = createSlice({
  name: "operator",
  initialState,
  reducers: {
    addOperator: (state, { payload }) => {
      payload.totalComputationalPower = 0;
      payload.minorsTotal = 0;
      payload.minors = [];

      state.operatorCount = state.operatorCount + 1;
      state.operators = [...state.operators, { ...payload }];
    },
    addMinor: addMinorAction,
    simulate: simulateAction,
  },
});

export const { addOperator, addMinor, simulate } = operatorsSlice.actions;

export default operatorsSlice.reducer;
