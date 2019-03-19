import { ADMIN, SUPPORT } from '../../APP-CONFIG';

const SidebarOptions = [
  {
    name: 'Próxima Entrega',
    to: '/inicio',
    icon: 'fas fa-home'
  },
  {
    name: 'Meu Perfil',
    to: '/meu-perfil',
    icon: 'fas fa-user'
  },
  {
    name: 'Cadastrar Entrega',
    to: '/lista-de-entregas',
    icon: 'fas fa-file-alt',
    roles: [].concat(ADMIN)
  },
  {
    name: 'Consultar Entregas',
    to: '/consultar-entregas',
    icon: 'fas fa-file-alt',
    roles: [].concat(ADMIN).concat(SUPPORT)
  },
  {
    name: 'Cadastrar Rota',
    to: '/lista-de-rotas',
    icon: 'fas fa-road',
    roles: [].concat(ADMIN)
  },
  {
    name: 'Consultar Usuários',
    to: '/usuarios',
    icon: 'fas fa-users',
    roles: [].concat(ADMIN).concat(SUPPORT)
  }
];

export default SidebarOptions;
