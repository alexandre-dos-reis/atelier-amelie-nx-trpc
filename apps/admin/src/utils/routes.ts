interface IRoutes {
  [key: string]: {
    url: string;
    children?: IRoutes;
  };
}

export const routes: IRoutes = {
  home: {
    url: '',
  },
  artworks: {
    url: 'artworks',
    children: {
      id: {
        url: ':id',
      },
      create: {
        url: 'create',
      },
    },
  },
  categories: {
    url: 'categories',
    children: {
      id: {
        url: ':id',
      },
      create: {
        url: 'create',
      },
    },
  },
  shop: {
    url: 'shop',
    children: {
      products: {
        url: 'products',
        children: {
          id: {
            url: ':id',
          },
          create: {
            url: 'create',
          },
          images: {
            url: 'images',
          },
        },
      },
      categories: {
        url: 'categories',
      },
      subCategories: {
        url: 'sub-categories',
      },
    },
  },
};

export const findRoute = (string: string, params: string[] = []) => {
  // TODO: handle params
  const keys = string.split('.');
  let res = '';
  let obj: IRoutes | undefined = routes;

  for (let i = 0; i < keys.length; i++) {
    const currentObj = obj?.[keys[i]];
    res += '/' + currentObj?.url;
    if (keys.length - 1 !== i) {
      obj = obj?.[keys[i]].children;
    }
  }

  return res;
};
