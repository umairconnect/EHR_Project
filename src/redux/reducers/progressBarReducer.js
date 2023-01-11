import {PROGRESS_BAR_STATE } from '../actions/types'

export default function (selectedState=false,action){
    if (action.type === PROGRESS_BAR_STATE) {
        return action.payload;
      }
      return selectedState;

}