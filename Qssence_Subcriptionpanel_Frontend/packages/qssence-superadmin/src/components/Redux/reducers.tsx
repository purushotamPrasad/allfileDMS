import { companyData, planData } from './action';


export interface PlantState {
    currentCompany: boolean; 
    currentPlan:boolean;
}


const initialState: PlantState = {
  currentCompany: true,
  currentPlan:true, 
};


const companyReducer = (state: PlantState = initialState, action: { type: string; payload: any }): PlantState => {
  switch (action.type) {
    case companyData:
      return {
        ...state,
        currentCompany: action.payload, 
      };
    case planData:
      return {
        ...state,
        currentPlan: action.payload, 
      };  
    default:
      return state;
  }
};

export default companyReducer;