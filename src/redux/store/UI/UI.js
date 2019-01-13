import Store from "./../storeDefault.js";
const { UI } = Store;

const SET_THEME = "SET_THEME";
const OPEN_MENU = "OPEN_MENU";
const CLOSE_MENU = "CLOSE_MENU";
const SET_IS_MOBILE = "SET_IS_MOBILE";

export default function reducer(state = UI, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_THEME:
      return { ...state, ...payload };
    case OPEN_MENU:
      return { ...state, menuIsOpen: true };
    case CLOSE_MENU:
      return { ...state, menuIsOpen: false };
    case SET_IS_MOBILE:
      return { ...state, isMobile: payload };

    default:
      return state;
  }
}
export function setTheme(payload) {
  return {
    type: SET_THEME,
    payload
  };
}

export function openMenu() {
  return {
    type: OPEN_MENU
  };
}

export function closeMenu() {
  return {
    type: CLOSE_MENU
  };
}

export function setIsMobile(payload) {
  return {
    type: SET_IS_MOBILE,
    payload
  };
}
