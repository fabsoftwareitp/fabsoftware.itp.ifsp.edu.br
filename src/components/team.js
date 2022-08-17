import { getMenuData } from "./scripts/app.js"; //TODO FIX change to load direct the file

class TeamComponent extends HTMLElement {
  navigation = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async getData() {
    const data = await getMenuData("membros");
    this.shadowRoot.querySelector(".shelf").innerHTML = data.map((item) => `<li><a href="${item.route}">${item.label != null ? item.label : item.title} </a></li>`).join("");
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.getTemplate();
  }

  // create templates that interpolate variables and HTML!
  getTemplate() {
    this.getData();

    return `
        <style>
          /* CSS will go here */
        </style>
  
        <nav>
          <ul class="shelf">Loading...</ul>
        </nav>
      `;
  }
}

customElements.define("app-team", TeamComponent);
