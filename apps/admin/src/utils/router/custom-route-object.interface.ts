import { RouteObject } from 'react-router-dom';

export interface CustomRouteObject extends RouteObject {
  children?: CustomRouteObject[];
  name?: string;
}
