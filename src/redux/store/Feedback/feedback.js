//@flow

import Store from "./../storeDefault";
const { Feedback } = Store;

export const UPDATE_MESSAGE = "UPDATE_MESSAGE";
export const UPDATE_MESSAGE_WITH_DELAY = "UPDATE_MESSAGE_WITH_DELAY";
export const UPDATE_ERROR_MESSAGE = "UPDATE_ERROR_MESSAGE";
export const UPDATE_ERROR_MESSAGE_WITH_DELAY =
  "UPDATE_ERROR_MESSAGE_WITH_DELAY";
export const RESET_FEEDBACK = "RESET_FEEDBACK";

export default function reducer(state: any = Feedback, action: any) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_MESSAGE:
      return { ...state, message: payload };
    case UPDATE_ERROR_MESSAGE:
      return { ...state, errorMessage: payload };
    case RESET_FEEDBACK:
      return { ...state, errorMessage: "", message: "" };
    default:
      return state;
  }
}

export function updateMessage(payload: string) {
  return {
    type: UPDATE_MESSAGE,
    payload
  };
}

export function updateMessageWithDelay(payload: string) {
  return { type: UPDATE_MESSAGE_WITH_DELAY, payload };
}

export function updateErrorMessage(payload: string) {
  return {
    type: UPDATE_ERROR_MESSAGE,
    payload
  };
}

export function updateErrorMessageWithDelay(payload: string) {
  return { type: UPDATE_ERROR_MESSAGE_WITH_DELAY, payload };
}

export function resetFeedback() {
  return { type: RESET_FEEDBACK };
}
