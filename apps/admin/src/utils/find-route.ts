import { CustomRouteObject } from '../routes/custom-route-object.interface';
import { Routes } from '../routes/RouterComponent';

export const findRoute = (string: string, param?: string | number): string => {
  const names = string.split('.');
  let res = '';
  let paramCounter = 0;
  let currentRoutes: CustomRouteObject[] | undefined = Routes;

  names.forEach((n, i) => {
    const matchedRoute: CustomRouteObject | undefined = currentRoutes?.find((r) => r.name === n);

    if (matchedRoute?.path?.startsWith(':')) {
      if (Array.isArray(param)){
        res += '/' + param[paramCounter];
        paramCounter += 1
      } else {
        res += '/' + param;
      }
    } else {
      res += '/' + matchedRoute?.path;
    }

    if (names.length - 1 !== i) {
      currentRoutes = matchedRoute?.children;
    }
  });

  return res;
};
