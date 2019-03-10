export const IS_PRODUCTION = !/localhost/.test(window.location.host);

export const BACKEND = /localhost/.test(window.location.host)
  ? 'http://localhost:3333'
  : 'https://switchblade-service.herokuapp.com';
