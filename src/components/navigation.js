class HeaderComponent extends HTMLElement {
  navigation = [];

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "closed" });
  }

  async connectedCallback() {
    const getGraph = await fetch("graph.json");
    const response = await getGraph.json();
    this.navigation = response.filter((e) => e.route.split("/").length == 3 && !e.route.includes("404"));
    this.root.innerHTML = this.getTemplate();
  }

  getTemplate() {
    const activeRoute = window.location.pathname;

    return /*html*/ `
      <style>
        header {
          background-color:black;
        }

        nav.menu {
          display:flex;
          justify-content: space-between;
          padding: 1rem 0;
          max-width: 80vw;
          flex-wrap: wrap;
          margin: 0 auto;
        }
        nav.menu ul {
          margin:0;
          padding:0;
          list-style-type:none;
          display:flex;
          justify-content: space-between;
        }

        nav.menu ul li {
          box-sizing: border-box;
          padding: 0.2rem 0.5rem;
        }

        nav.menu a {
          text-decoration: none;
          color:white;
          display: flex;
          align-items: center;
        }

        nav.menu .logo {
          font-size: 1.25rem;
          gap:0.4rem;
        }

        nav.menu a.active {
          color: #FD624C;
          text-decoration: underline;
        }
        nav.menu a:hover {
          color: #FD624C;
          text-decoration: underline;
        }

        nav.menu img {
          max-width: 1.5rem;
        }

        nav.menu .container {
          max-width: 80vw;
        }
      </style>
      <header>
        <nav class="menu">
            <a href="/" class="logo">
              <img src="/assets/logo-oficial.png" alt="logo oficial">
              <span>FabSoftware</span></a>
            <ul>
              ${this.navigation
                .map((item) => {
                  const isCurentPageLink = activeRoute.indexOf(item.route) >= 0;
                  const activeClassName = isCurentPageLink ? "active" : "";
                  return `<li>
                      <a href="${item.route}" class="${activeClassName}" >${item.title != null ? item.title : item.label}</a>
                    </li>`;
                })
                .join("")}
                <li><a href="https://github.com/fabsoftwareitp" target="_blank">GitHub</a></li>
            </ul>
        </nav>
      </header>
    `;
  }
}
customElements.define("app-header", HeaderComponent);
