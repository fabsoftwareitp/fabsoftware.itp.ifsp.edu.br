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
  padding:20px 0 30px;
  font-size:15px;
  line-height:24px;
  color:#737373;
}
.ds-flex{
  margin-left:10%;
  margin-right:10%;
  justify-content:space-between;
  align-content:center;
  text-align:center;
}
.footer hr{
  border-top-color:#bbb;
  opacity:0.5
  
}

.footer-container{
  aligh-content:center;
  justify-content:center;
}

.footer img{
  max-width: 1.5rem;
}

.footer a{
  color:#737373;
}

.footer a:hover{
  text-decoration:none;
}

.footer-links{
  padding-left:0;
  list-style:none
}

.copyright-text{
  margin:0;
  text-align:center;
}

@media (max-width:991px){
  .footer{
    margin-bottom:30px
  }
}

@media (max-width:767px){
  .footer{
    padding-bottom:0
  }
  .footer .copyright-text{
    text-align:center
  }
}
.footer-logo {
  font-size: 1.25rem;
  gap:0.4rem;
}
.footer-fab{
  position:relative;
  bottom:2px;
  color:#fff;
  font-size:30px;
  text-decoration: none
}
.footer-fab:hover{
  position:relative;
  bottom:2px;
  color:#fff;
  font-size:31px;
  text-decoration: none
}
.footer-p{
  font-size:15px;
  margin-bottom:50px;
}

          </style>
    <footer class="footer">
      <div class="container">
        <div class="ds-flex">
          <div>
          <div class="test">
          <a href="/" class="footer-fab">
              <img src="/assets/logo-oficial.png" alt="logo oficial"><span class="footer-fab">Fabrica de Softwares<span></a>
            </div>
            <p class="footer-p">Somos um grupo de desenvolvimento procurando por novas e criativas soluções para ajudar pessoas com nossos produtos em seus objetivos</p>
          </div>

          <div>
            
            <ul class="footer-links">
              <li>Email: fabricasoftware@gmail.com</li>
              <li>Facebook: Fabrica de Softwares</li>
              <li>Github: <a>https://github.com/ifsp-itp/sgeIFSP</a></li>
            </ul>
          </div>

          
        </div>
        <hr>
      </div>

      <div>
        <div class="footer-container">
          <div>
            <p class="copyright-text">Copyright &copy; 2022 All Rights Reserved by 
         <a href="#">Fabrica de Software</a>.
            </p>
            <p><img width="25" class="invert-elements img-fluid" height="25" src="https://fabsoftware.itp.ifsp.edu.br/sge.stag/images/facebook-logo.svg"></p>
          </div>
        </div>
      </div>
</footer>
        `;
      }
    }
  customElements.define("app-footer", FooterComponent);