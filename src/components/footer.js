class FooterComponent extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "closed" });
  }

  async connectedCallback() {
    this.root.innerHTML = this.getFooter();
  }

  getFooter() {
    return /*html*/ `
      <style>
        .footer{
          background-color:#26272b;
          padding:20px 5px 10px;
          font-size:15px;
          color:#737373;
          text-align:center;
        }

        .footer img{
          max-width: 1.5rem;
        }

        .footer a:hover{
          text-decoration:none;
        }

        .footer-fab{
          color:#fff;
          font-size:25px;
          text-decoration: none
        }
  
        .footer-p{
          color:white;
          margin: 5px 0;
        }
      </style>
      <footer class="footer">
        
        <a href="/" class="footer-fab">
            <img src="/assets/logo-oficial.png" alt="logo oficial">
            <span class="footer-fab">Fábrica de Software<span>
        </a>

        <p class="footer-p">Somos um grupo de desenvolvimento procurando por novas e criativas soluções para ajudar pessoas com nossos produtos em seus objetivos.</p>
        <p>Desde 2019</p>

      </footer>
    `;
  }
}
customElements.define("app-footer", FooterComponent);
