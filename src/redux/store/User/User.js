import Store from "./../storeDefault";
const { User } = Store;
export const UPDATE_USER = "UPDATE_USER";
export const RESET_USER = "RESET_USER";
export default function Reducer(state = User, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USER:
      return { ...state, ...payload };
    case RESET_USER:
      return {};
    default:
      return state;
  }
}
export function UpdateUser(payload) {
  return { type: UPDATE_USER, payload };
}
export function ResetUser() {
  return { type: RESET_USER };
}
