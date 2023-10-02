import { getMenuData } from "./scripts/app.js"; //TODO FIX change to load direct the file

class TeamComponent extends HTMLElement {
  navigation = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  getAllTeams() {
    console.log("aeww");
    
  }

  async getData() {
    const data = await getMenuData("membros");
    console.log(data);
    this.shadowRoot.querySelector(".shelf").innerHTML = data
      .map(
        (item) => `
      <li class="${item.data.date}">
        <img src="${item.data.img}" width="100" style="border-radius: 100%">
        <a href="${item.route}">${item.label != null ? item.label : item.title}</a>
        <p>${item.data.position}</p>
      </li>`
      )
      .join("");
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.getTemplate();
    const listBtn = this.shadowRoot.querySelectorAll(".btn");
    
    listBtn.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const ano = btn.getAttribute("data-ano");
        this.shadowRoot.querySelectorAll("li").forEach(e => {
          e.style.opacity= 0.5;
        })
        this.shadowRoot.querySelectorAll(`.${ano}`).forEach(e => {
          e.style.opacity = 1;
        });
        this.shadowRoot.querySelectorAll(".teamprof").forEach(e => {
          e.style.opacity = 1;
        });    
      })
    })

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
            align-itens: center;
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

          .btn {
            background-color: #fd624c;
            color: white;
            border-radius: 7px;
            padding: 5px;
            border: none;
            font-size: 19px;
            margin: 2.5px;
          }

          .btn:hover {
            cursor: pointer;
            background-color: #fd402c;
          }

          @media (max-width: 900px){
            .shelf {
              justify-content: center;
            }
          }

        </style>
  
        <nav>
          <div>
          <button class="btn" data-ano="team">Todos os Memebros</button>
          <button class="btn" data-ano="team23">Equipe 23</button>
          <button class="btn" data-ano="team22">Equipe 22</button>
          <button class="btn" data-ano="team21">Equipe 21</button>
          <button class="btn" data-ano="team20">Equipe 20</button>
          <button class="btn" data-ano="team19">Equipe 19</button>
          </div>
          <ul class="shelf">Loading...</ul>
        </nav>
        
      `;
  }
}

customElements.define("app-team", TeamComponent);