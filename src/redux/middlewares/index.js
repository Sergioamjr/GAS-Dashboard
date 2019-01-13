import {
  UPDATE_ERROR_MESSAGE,
  UPDATE_MESSAGE,
  UPDATE_ERROR_MESSAGE_WITH_DELAY,
  UPDATE_MESSAGE_WITH_DELAY
} from "../store/Feedback/feedback";

export const customMiddleware = store => next => action => {
  const typesToIntercept = [
    UPDATE_MESSAGE_WITH_DELAY,
    UPDATE_ERROR_MESSAGE_WITH_DELAY
  ];
  if (typesToIntercept.includes(action.type)) {
    const newType =
      action.type === UPDATE_MESSAGE_WITH_DELAY
        ? UPDATE_MESSAGE
        : UPDATE_ERROR_MESSAGE;
    setTimeout(() => {
      next({ ...action, type: newType });
    }, 300);
  } else {
    next(action);
  }
};
