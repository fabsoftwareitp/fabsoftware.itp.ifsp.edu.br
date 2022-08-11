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

        nav.menu {
          display:flex;
          justify-content: space-around;
          padding: 1rem 0;
          background-color:black;
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
        }

        nav.menu a.active {
          color: #FD624C;
          text-decoration: underline;
          font-weight: bold;
        }
      </style>
      <nav class="menu">
        <ul>
          ${this.navigation
            .map((item) => {
              const isCurentPageLink = activeRoute.indexOf(item.route) >= 0;
              const activeClassName = isCurentPageLink ? "active" : "";
              return `<li>
                  <a href="${item.route}" class="${activeClassName}" >${item.label != null ? item.label : item.title}</a>
                </li>`;
            })
            .join("")}
        </ul>
      </nav>
    `;
  }
}
customElements.define("app-header", HeaderComponent);
