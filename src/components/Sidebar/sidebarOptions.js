const SidebarOptions = [
  {
    name: 'Início',
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
    roles: ['ADMIN', 'SUPPORT', 'RH']
  },
  {
    name: 'Cadastrar Rota',
    to: '/lista-de-rotas',
    icon: 'fas fa-road',
    roles: ['ADMIN']
  },
  {
    name: 'Consultar Usuários',
    to: '/usuarios',
    icon: 'fas fa-users',
    roles: ['ADMIN']
  }
];

export default SidebarOptions;
