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
          align-items: center;
          height: 50px;
          padding: 1em;
          position:relative;
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

        
        /*hamburger*/
        .hamburger {
          display: flex;
          flex-direction: row;
          list-style-type: none;
    
        }

        .hamburger > li {
          margin: 0 1rem;
          overflow: hidden;
        }

        .hamburger-button-container {
          display: none;
          height: 100%;
          width: 30px;
          cursor: pointer;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        #hamburger-toggle {
          display: none;
        }

        .hamburger-button,.hamburger-button::before,.hamburger-button::after {
          display: block;
          background-color: #fff;
          position: absolute;
          height: 4px;
          width: 30px;
          transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
          border-radius: 2px;
        }

        .hamburger-button::before {
          content: "";
          margin-top: -8px;
        }

        .hamburger-button::after {
          content: "";
          margin-top: 8px;
        }

        #hamburger-toggle:checked + .hamburger-button-container .hamburger-button::before {
          margin-top: 0px;
          transform: rotate(405deg);
        }

        #hamburger-toggle:checked + .hamburger-button-container .hamburger-button {
          background: rgba(255, 255, 255, 0);
        }

        #hamburger-toggle:checked + .hamburger-button-container .hamburger-button::after {
          margin-top: 0px;
          transform: rotate(-405deg);
        }

        @media (max-width: 900px) {
          .hamburger-button-container {
            display: flex;
          }

          .hamburger {
            position: absolute;
            z-index:2;
            top: 86px;
            left: 0;
            flex-direction: column;
            align-items: center;
            width: 100%;
          }

          #hamburger-toggle ~ .hamburger li {
            height: 0;
            margin: 0;
            padding: 0;
            border: 0;
            transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
          }

          #hamburger-toggle:checked ~ .hamburger li {
            border: 1px solid #333;
            height: 2.5em;
            padding: 0.5em;
            transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
          }

          .hamburger > li {
            display: flex;
            justify-content: center;
            margin: 0;
            padding: 0.5em 0;
            width: 100%;
            color: white;
            background-color: #222;
          }

          .hamburger > li:not(:last-child) {
            border-bottom: 1px solid #444;
          }
        }
      </style>
      <header>
        <nav class="menu">
            <a href="/" class="logo">
              <img src="/assets/logo-oficial.png" alt="logo oficial">
              <span>FabSoftware</span></a>
              <input id="hamburger-toggle" type="checkbox" />
                <label class='hamburger-button-container' for="hamburger-toggle">
                  <div class='hamburger-button'></div>
                </label>
            <ul class="hamburger">
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
