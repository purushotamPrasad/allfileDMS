import { groupData, listUserData, plantData, roleData, setupEmail, showGroupData, showPlantData, showUserData, showUserGroupData, showUserRoleData, workflowConnectivityData, workflowData } from './action';


export interface PlantState {
    currentGroup: string; 
    currentRole: string; 
    currentPlant: string; 
    viewPlant:string;
    viewUser:string;
    viewGroup:string;
    showUserGroup:string;
    showRoleGroup:string;
    listUser:any;
    workflowId:any;
    emailConfig:any;
    workflowConnectivity:any;
}


const initialState: PlantState = {
  currentGroup: "",
  currentRole: "", 
  currentPlant: "",
  viewUser:"",
  listUser:"",
  viewPlant:"",
  viewGroup:"",
  showUserGroup:"",
  showRoleGroup:"",
  emailConfig:"", 
  workflowId:"",
  workflowConnectivity:""
};


const plantReducer = (state: PlantState = initialState, action: { type: string; payload: any }): PlantState => {
  switch (action.type) {
    case plantData:
      return {
        ...state,
        currentPlant: action.payload, 
      };
    case showPlantData:
      return {
        ...state,
        viewPlant: action.payload, 
      };
    case roleData:
      return {
        ...state,
        currentRole: action.payload, 
      }; 
    case groupData:
    return {
      ...state,
      currentGroup: action.payload, 
    };   
    case workflowData:
    return {
      ...state,
      workflowId: action.payload, 
    };
    case showUserData:
    return {
      ...state,
      viewUser: action.payload, 
    };
    case setupEmail:
      return {
        ...state,
        emailConfig: action.payload, 
      };
    case listUserData:
      return {
        ...state,
        listUser: action.payload, 
      };
      case showGroupData:
      return {
        ...state,
        viewGroup: action.payload, 
      };
      case showUserGroupData:
        return {
          ...state,
          showUserGroup: action.payload, 
        };
      case showUserRoleData:
        return {
          ...state,
          showRoleGroup: action.payload, 
        };
    case workflowConnectivityData:
      return {
        ...state,
        workflowConnectivity: action.payload, 
      };

    default:
      return state;
  }
};

export default plantReducer;