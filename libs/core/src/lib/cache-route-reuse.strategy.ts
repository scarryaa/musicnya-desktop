import { RouteReuseStrategy } from '@angular/router/';
import { ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class CacheRouteReuseStrategy implements RouteReuseStrategy {
  storedRouteHandles = new Map<string, DetachedRouteHandle>();
  allowRetriveCache: { [key: string]: boolean } = {
    home: true,
  };

  shouldReuseRoute(
    before: ActivatedRouteSnapshot,
    current: ActivatedRouteSnapshot
  ): boolean {
    this.allowRetriveCache['home'] =
      this.getPath(current) === 'home' ? true : false;
    return before.routeConfig === current.routeConfig;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    // eslint-disable-next-line unicorn/no-null
    return this.storedRouteHandles.get(this.getPath(route)) || null;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const path = this.getPath(route);
    if (this.allowRetriveCache[path]) {
      return this.storedRouteHandles.has(this.getPath(route));
    }

    return false;
  }

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const path = this.getPath(route);
    if (Object.hasOwn(this.allowRetriveCache, path)) {
      return true;
    }
    return false;
  }

  store(
    route: ActivatedRouteSnapshot,
    detachedTree: DetachedRouteHandle
  ): void {
    this.storedRouteHandles.set(this.getPath(route), detachedTree);
  }

  private getPath(route: ActivatedRouteSnapshot): string {
    if (route.routeConfig !== null && route.routeConfig.path !== null) {
      return route.routeConfig.path || '';
    }
    return '';
  }
}
