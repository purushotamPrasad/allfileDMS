import { timelineData } from './action';

// Define the state type
export interface TimelineState {
  currentTimeline: string; // Replace `string` with a more specific type if needed
}

// Define the initial state
const initialState: TimelineState = {
  currentTimeline: "", // Default value for currentTimeline
};

// Define the reducer with proper type annotations
const timelineReducer = (state: TimelineState = initialState, action: { type: string; payload: any }): TimelineState => {
  switch (action.type) {
    case timelineData:
      return {
        ...state,
        currentTimeline: action.payload, // Update the correct key
      };

    default:
      return state;
  }
};

export default timelineReducer;
