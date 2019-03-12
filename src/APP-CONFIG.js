export const IS_PRODUCTION = !/localhost/.test(window.location.host);

export const BACKEND = /localhost/.test(window.location.host)
  ? 'http://localhost:3333'
  : 'https://switchblade-service.herokuapp.com';

export const ADMIN = [
  'sergioamjr91@gmail.com',
  'cuecacuela@gmail.com',
  'admin@gas.com'
];

export const SUPPORT = ['suporte@gas.com'];
