---
title: Debug de projetos no Celular usando o Chrome DevTools via USB
---
# **Debug de projetos no Celular usando o Chrome DevTools via USB**

## **Passo a Passo:**

- Abra as configurações do celular;
- Vá em `Sobre o telefone`;
- Pressione o número da versão do celular sete vezes até aparecer a mensagem "you are now a developer";
- Habilite a opção "ativar a depuração USB" ou alguma frase semelhante (depende do SO);
- Conecte o cabo USB no celular e no computador;
- Acesse `chrome://inspect#devices` no Chrome do computador;

\
\
Deverá abrir esse site acima.

- Verifique se a opção `Discover USB devices` está habilitada;
- Quando aparecer o celular vá em "Configure" e digite o caminho do localhost seguindo o exemplo a seguir:

\

- Pressione `done` quando já tiver inserido a porta, escrevendo esse caminho na parte inferior ao nome do dispositivo conectado;

\
\*Em `port fowarding` você deve inserir a porta que você deseja acessar no seu PC, diferentemente da opção abaixo que seleciona a porta do celular a ser executada

- Pressione o botão `Open` localizado à direita do caminho inserido, isso fará com que o dispositivo celular consiga rodar o código local;
- Para ver a tela do celular no computador, pressione `Inspecionar`, isso abrirá uma tela compartilhada do celular.

---

> Obs: Se estiver usando o VS code, você deve usar a extensão `Go Live` para gerar a porta do localhost.
