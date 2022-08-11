export async function getMenuData(urlPath) {
    if(!urlPath) return;
    let url = `/${urlPath}/`;
    const file = window.location.origin + '/graph.json';
    const getGraph = await fetch(file);
    const response = await getGraph.json();
    const nav = response.filter(e => e.route.startsWith(url) && e.route != url);
    return nav;
}
