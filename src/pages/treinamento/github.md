---
extends: _layouts.treina
section: content

name: "Git e Github"
---
# Material de Treinamento - Git e Github

Esta página contém materiais de apoio para o aprendizado da tecnologia Git e do sistema Github, usados em todos os projetos da Fábrica, e poderá sofrer alterações no futuro. Participantes da Fábrica de Software podem adicionar material.

## Tutorial - Como clonar seu repositório Github

**AVISO:** Você precisará ter o Git instalado em sua máquina. Para download do Git, [clique aqui](https://git-scm.com/downloads). Será preciso também uma conta no Github, que você pode fazer clicando [aqui](https://github.com). Irei usar o VS Code para o tutorial.

1. Abra o terminal e vá para a pasta em que se deseja trabalhar usando o comando `cd [caminho da pasta]`;
2. Digite `git init` para inicializar a pasta `.git`, que funcionará como meio de armazenar os arquivos para o *commit*;
3. Após isso, digite `git clone [url do repositório a ser clonado]` para baixar uma cópia do projeto para sua máquina, e tendo baixado-a, digite `cd [nome do repositório clonado]` para acessar a nova pasta. OBS.: Para pegar o link do repositório, basta entrar nele pelo Github, clicar no botão verde que diz **Code**  e copiar a URL que aparecer;
4. Digite os comandos `git config --global user.name "[nome do usuário]"` e `git config --global user.email "[email do usuário]"` para se conectar à sua conta do Github, para assim realizar seu *commits*;
5. Para realizar *commits* por uma *branch* específica, é preciso entrar nela pelo terminal, usando o comando `git checkout [nome da *branch*]`;
6. Após realizar as alterações desejadas nos arquivos, é preciso fazer o *commit* das mudanças. Para isso, clique no terceiro ícone da barra lateral do VS Code, dê uma descrição para o *commit* no campo de escrever e clique no botão com um símbolo de visto. Após alguns momentos, clique em **Sincronizar alterações**;
7. Para requisitar o *merge*, isto é, o envio dos arquivos de sua *branch* para outra *branch* principal, é preciso fazer um *pull request*. Para isso, clique na aba **Pull requests** no Github e crie um novo pull request com base na *branch* para qual você deseja enviar os arquivos, comparando com sua própria *branch*.



### -- Alguns comandos importantes para versionamento de código com o Git --

- `git init` ---- Inicializa o Git;
- `git clone [url]` ---- Clona o repositório Github;
- `git config --global user.name ""`//`git config --global user.email ""` ---- Especifica nome e email do usuário para *commits*;
- `git checkout [nome da *branch*]` ---- Muda para a *branch* especificada;
- `git pull` ---- Atualiza os arquivos à sua disposição baseado nas mudanças feitas na *branch*;

## Cursos e vídeos

- [Curso de Git e Github - Curso em Vídeo](https://www.youtube.com/playlist?list=PLHz_AreHm4dm7ZULPAmadvNhH6vk9oNZA)

## Material escrito e documentação

- [Documentação oficial do Git](https://git-scm.com/docs)