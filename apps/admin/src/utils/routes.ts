interface IRoutes {
  [key: string]: {
    url: string;
    children?: IRoutes;
  };
}

export const routes: IRoutes = {
  home: {
    url: '/',
  },
  artworks: {
    url: '/artworks',
    children: {
      id: {
        url: ':id',
      },
      create: {
        url: 'create',
      },
    },
  },
};
