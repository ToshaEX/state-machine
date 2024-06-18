import { OperatorBehaviourEnum } from "../../enum";

const HONEST_VALUATION = 1;
const SELFISH_VALUATION = 1.5;
const TAX_REDUCTION = 0.9;

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
      poolOperatorAvgHash:totalHashRate/operator.length,
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
    const { hashRateAvg, valuationPerHash ,poolOperatorAvgHash} = findAverage(state.operators);
    // const operators =[...state.operators];
    // operators.map((operator)=>({
    //   ...operator,operatorResourceTax: (( operator.totalComputationalPower-poolOperatorAvgHash)/100)*TAX_REDUCTION
    // }))
    state={...state,hashRateAvg, valuationPerHash ,poolOperatorAvgHash}

  };

  const addOperatorReducer= (state, { payload }) => {
    payload.totalComputationalPower = 0;
    payload.minorsTotal = 0;
    payload.minors = [];


    for(let i=0;i<payload.amount;i++){
      const minorData={
        id:state.minorsTotal,
        nickName:`Miner-${state.minorsTotal}`,
        hashRate:0,
        valuation:0
      };
      if(OperatorBehaviourEnum.HONEST===payload.operatorBehavior){
        
        const hashRate = Math.floor(Math.random()*1000);
        minorData.hashRate=hashRate
        minorData.valuation=hashRate * HONEST_VALUATION

      }else if(OperatorBehaviourEnum.UNPREDICTABLE===payload.operatorBehavior){
        
        const hashRate = Math.floor(Math.random()*1000);
        minorData.hashRate=hashRate
        const random =Math.random() < 0.5;
        
        if(random){
          minorData.valuation=hashRate * (HONEST_VALUATION)
        }else{
          minorData.valuation=hashRate * (SELFISH_VALUATION)
        }
      }else{
        const hashRate = Math.floor(Math.random()*1000);
        minorData.hashRate=hashRate
        minorData.valuation=hashRate * SELFISH_VALUATION

      }
      payload.totalComputationalPower=payload.totalComputationalPower+ minorData.hashRate
      state.minorsTotal=payload.minorsTotal+1
      payload.minorsTotal=payload.minorsTotal+1
      payload.minors.push(minorData);
    }
    
    state.operatorCount = state.operatorCount + 1;
    state.totalpotionRate = state.totalpotionRate + parseFloat(payload.potionRate);
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