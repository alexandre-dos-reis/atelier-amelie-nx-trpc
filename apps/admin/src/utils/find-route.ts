import { CustomRouteObject } from '../routes/custom-route-object.interface';
import { Routes } from '../routes/RouterComponent';

export const findRoute = (string: string): string => {
  const names = string.split('.');
  let res = '';
  let currentRoutes: CustomRouteObject[] | undefined = Routes;

  for (let i = 0; i < names.length; i++) {
    const matchedRoute: CustomRouteObject | undefined = currentRoutes?.find(
      (r) => r.name === names[i]
    );

    res += '/' + matchedRoute?.path;

    if (names.length - 1 !== i) {
      currentRoutes = matchedRoute?.children;
    }
  }

  return res;
};
