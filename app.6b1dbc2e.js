async function t(t){if(!t)return;let n=`/${t}/`;const o=window.location.origin+"/graph.json",r=await fetch(o);return(await r.json()).filter((t=>t.route.startsWith(n)&&t.route!=n))}export{t as getMenuData};
//# sourceMappingURL=app.6b1dbc2e.js.map
