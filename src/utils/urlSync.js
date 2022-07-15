export const getDefaultPath = () => {
  const getParent = lastRoute => {
    const parent = [];
    if (!lastRoute) return parent;
    parent.push(lastRoute);
    return parent;
  }

  if (window && window.location.pathname) {
    const routes = window.location.pathname.split('/');
    if (routes.length > 1) {
      const lastRoute = routes[routes.length - 1];
      return getParent(lastRoute);
    }
  }

  return [];
}