class HeaderComponent extends HTMLElement {

  navigation = [];

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'closed' });
  }

  async connectedCallback() {
    const getGraph = await fetch('graph.json');
    const response = await getGraph.json();
    this.navigation = response.filter(e => e.route.split('/').length == 3 && !e.route.includes('404'))
    this.root.innerHTML = this.getTemplate();
  }

  getTemplate() {
    return /*html*/`
      <style>

        nav {
          display:flex;
          justify-content: space-between;
          margin: 0.7rem 0;
        }
        nav ul {
          margin:0;
          padding:0;
          list-style-type:none;
          display:flex;
          justify-content: space-between;
        }

        nav ul li {
          box-sizing: border-box;
          padding: 0.2rem 0.5rem;
        }

 
      </style>

      <nav>
        <a href="/">FabSoftware</a>
        <ul>
          ${this.navigation.map(item =>
            `<li><a href="${item.route}">${item.label != null ? item.label : item.title} </a></li>`).join('')}
        </ul>
      </nav>
    `;
  }
}
customElements.define('app-header', HeaderComponent);
