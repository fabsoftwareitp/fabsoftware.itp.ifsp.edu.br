import { getMenuData } from "./scripts/app.js"; //TODO FIX change to load direct the file

class TeamComponent extends HTMLElement {
  navigation = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async getData() {
    const data = await getMenuData("membros");
    console.log(data);
    this.shadowRoot.querySelector(".shelf").innerHTML = data
      .map(
        (item) => `
      <li>
        <img src="${item.data.img}" width="100" style="border-radius: 100%">
        <a href="${item.route}">${item.label != null ? item.label : item.title}</a>
        <p>${item.data.position}</p>
      </li>`
      )
      .join("");
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.getTemplate();
  }

  // create templates that interpolate variables and HTML!
  getTemplate() {
    this.getData();

    return `
        <style>
          ul {
            list-style:none;
            text-align:center;
          }

          a {
            color:#fd624c;
          }

          .shelf {
            display: flex;
            flex-wrap: wrap;
            gap: 3vw;
            margin: 1.5vw 0; 
          }

          .shelf > li {
            display: flex; 
            flex-direction: column;
            align-items: center; 
            justify-content: center;
          }

          .shelf > li > a {
            width: 150px;
          }
        </style>
  
        <nav>
          <ul class="shelf">Loading...</ul>
        </nav>
        
      `;
  }
}

customElements.define("app-team", TeamComponent);
