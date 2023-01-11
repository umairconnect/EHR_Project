import { PROGRESS_BAR_STATE } from "./types"

export const selectProgressBarState = (selectedState) => {
    // Return an action
    return {
      type: PROGRESS_BAR_STATE ,
      payload: selectedState
    };
  };