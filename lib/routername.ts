export function getRouterName(route: string): string {
    if (route.includes('detail')) {
        return 'Details';
    }
    if (route.includes('login')) {
        return 'Login';
    }
    if (route.includes('search')) {
        return 'Search';
    }
    return 'Dashboard';
}