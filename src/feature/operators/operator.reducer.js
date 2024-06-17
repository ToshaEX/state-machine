import { OperatorBehaviourEnum } from "../../enum";

const HONEST_VALUATION = 1;
const SELFISH_VALUATION = 1.5;

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

const addMinorReducer = (state, { payload }) => {
    const operator = state.operators.find((ele) => ele.id === payload.operatorId);
    const operatorArr = state.operators.filter(
      (ele) => ele.id !== payload.operatorId,
    );
  
    operator.minors = [...operator.minors, { ...payload.minorData }];
  
    state.minorsTotal = state.minorsTotal + 1;
    state.operators = [...operatorArr, operator];
  };
  
  const simulateReducer = async (state) => {
    state.prevOperators = [...state.operators];
    const { hashRateAvg, valuationPerHash } = findAverage(state.operators);
  
    console.log(hashRateAvg, valuationPerHash);
  };

  const addOperatorReducer= (state, { payload }) => {
    payload.totalComputationalPower = 0;
    payload.minorsTotal = 0;
    payload.minors = [];
    
    console.log("payload.amount"),payload.amount;
    for(let i=0;i<payload.amount;i++){
      console.log("loop");
      const minorData={
        nickName:`Miner-${state.minorsTotal}`,
        hashRate:0,
        valuation:0
      };
      
      if(OperatorBehaviourEnum.HONEST===payload.operatorBehavior){
        const hashRate = Math.random()*1000;
        minorData.hashRate=hashRate
        minorData.valuation=hashRate * HONEST_VALUATION
      }
      
      payload.minors.push(minorData);
      state.minorsTotal = state.minorsTotal + 1;
    }
    console.log(payload );  
    state.operatorCount = state.operatorCount + 1;
    state.operators = [...state.operators, { ...payload }];

  }

  const minorCreationReducer= (state, { payload }) => {
    payload.amount =5;
    switch(payload.operatorBehaviour){
      case OperatorBehaviourEnum.HONEST:
        addMinors(state,{payload})
        console.log(OperatorBehaviourEnum.HONEST);
        break;
      case OperatorBehaviourEnum.SELFISH:
        console.log(OperatorBehaviourEnum.HONEST);
        break;
      case OperatorBehaviourEnum.UNPREDICTABLE:
        break;
  
    }
  }

  const addMinors=(state,{payload})=>{

    const operator = state.operators.find((ele) => ele.id === payload.operatorId);
    const operatorArr = state.operators.filter(
      (ele) => ele.id !== payload.operatorId,
    );
    console.log(state.operators);
    for(let i=0;i<payload.amount;i++){
     
      const minorData={
        nickName:`Miner-${state.minorsTotal}`,
        hashRate:0,
        valuation:0
      };

      if(OperatorBehaviourEnum.HONEST){
        const hashRate = Math.random()*1000;
        minorData.hashRate=hashRate
        minorData.valuation=hashRate * HONEST_VALUATION
      }

      operator.minors = [...operator.minors, { ...minorData }];
      state.minorsTotal = state.minorsTotal + 1;
    }
    state.operators = [...operatorArr, operator];
  }


  export {
    addMinorReducer,
    simulateReducer,
    addOperatorReducer,
    minorCreationReducer
  }