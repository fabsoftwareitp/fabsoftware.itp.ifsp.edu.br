import { getMenuData } from "./scripts/app.js"; //TODO FIX change to load direct the file

class ProjectsComponent extends HTMLElement {
  navigation = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async getData() {
    const data = await getMenuData("projetos");
    this.shadowRoot.querySelector(".shelf").innerHTML = data
      .map(
        (item) =>
          `<div>
            <h2>${item.label != null ? item.label : item.title}</h2>
            <img src="${item.data.img}" alt="">
            <p><a href="${item.route}">Saiba mais..</a>
              
            </p>
          </div>`
      )
      .join("");
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.getTemplate();
  }

  getTemplate() {
    this.getData();

    return `
        <style>
          img {
            max-width:100%;
          }
        </style>
  
        <nav class="shelf">
          Loading...
        </nav>
      `;
  }
}

customElements.define("app-projects", ProjectsComponent);
