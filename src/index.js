async function getMenuData(urlPath) {
    if(!urlPath) return;
    let url = `/${urlPath}/`;
    const getGraph = await fetch('graph.json');
    const response = await getGraph.json();
    const nav = response.filter(e => e.route.startsWith(url) && e.route != url);
    return nav;
}
