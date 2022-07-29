interface IRoutes {
  [key: string]: {
    url: string;
    params?: {
      [key: string]: string;
    };
  };
}

export const routes: IRoutes = {
  home: {
    url: '/',
  },
  artworks: {
    url: '/artworks',
    params: {
      id: 'id',
    },
  },
};
