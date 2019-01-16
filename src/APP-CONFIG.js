export const IS_PRODUCTION = !/localhost/.test(window.location.host);
// export const BACKEND = "http://localhost:5000/api";

export const BACKEND = /localhost/.test(window.location.host)
  ? "http://localhost:3333"
  : "https://cst-fearless-hyrax.cfapps.io/api";
