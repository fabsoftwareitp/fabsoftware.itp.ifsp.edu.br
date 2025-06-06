---
title: Manual do fluxo de trabalho com git/gitHub na fábrica
---
# Manual do fluxo de trabalho com git/gitHub na fábrica

## 1. Configuração inicial do Git na máquina:

Primeiro você deve abrir o Terminal em seu VS Code e utilizar os comandos `$ git config --global user.name "Usuário"` e `$ git config --global user.email "Email"` para colocar suas informações do gitHub.

![Image](https://github.com/user-attachments/assets/1ae64ba3-483a-45ff-a8a1-1e6dae27c9b1)

## 2. Clonagem de um repositório:

Após colocar suas informações, você deve procurar o repositório do projeto que desejar, clicar em `<>Code` e copiar o URL.

![Image](https://github.com/user-attachments/assets/70e1b091-5348-4880-aa00-049b00531ae0)

Após copiar o URL você deve voltar ao Terminal do VS Code e usar o comado `git clone "URL"`.

Após clonar repositório, abra a pasta do projeto.

## 3. Criação de uma branch a partir da issue:

Dentro da pasta do projeto é muito importante lembrar de nunca modificar a MAIN.

![Image](https://github.com/user-attachments/assets/95bad5e5-bc4f-4cbb-a2bb-162d125ad993)

E para isso é necessário criar uma Branch nova, uma cópia da MAIN onde não irá modificar ela.

Para criar uma nova Branch você pode utilizar o comando `git checkout -b`  e informa o nome da nova branch, ou Clicar em MAIN, criar nova Branch e escrever o nome , porém é muito importante colocar um nome que faça sentido (ex: `feature/nome-da-tarefa`, `fix/ajuste-x`), para uma melhor organização.

<strong>OBS: Lembre-se sempre de trocar para sua Branch quando for modificar o código.</strong>

![Image](https://github.com/user-attachments/assets/2006d7d7-6200-4bc9-9570-f2a6ccebd7e9)

## 4. Desenvolvimento:

Para o desenvolvimento do projeto é extremamente necessário o uso de commits frequentes e bem explicativos sobre as mudanças realizadas.

O commit serve para salvar as alterações realizadas apenas na Branch modificada, assim evitando perdas de progressos já realizados no projeto.

Para realizar um commit você pode utilizar  o comando `git add .` e `git commit -m "informação do commit"`  no Terminal, ou clique na opção de controle de mudanças  e clique na opção `commit`.

<strong>OBS: Lembre-se sempre de colocar uma descrição que faça sentido para manter a organização.</strong>

![Image](https://github.com/user-attachments/assets/d08a8aee-0eab-40c1-9674-2ea6c6e79dac)

## 5.Sincronização com a branch remota:

Para sincronizar a sua Branch com a versão mais atual dela é bem simples, apenas use o comando `git push -u origin nome-da-branch` no Terminal do VS Code ou aperte as setas do lado do nome da sua Branch.

![Image](https://github.com/user-attachments/assets/947808d6-5bf8-4adf-add7-a9adebd999ef)

## 6.Criação de Pull Request:

Após terminar as mudanças no projeto, você deve juntar as mudanças na MAIN, para isso você deve voltar no gitHub, entrar no repositório do projeto, escolher a sua Branch

![Image](https://github.com/user-attachments/assets/b6ff610a-e690-4d49-beec-aba92fa567af)

clicar em `contribute` e em `Open pull request`

![Image](https://github.com/user-attachments/assets/e16750bd-2556-4b74-b96f-e0a6963b099f)

coloque um TITULO e uma DESCRIÇÃO coerente com as mudanças feitas e então clique em `create pull request`

![Image](https://github.com/user-attachments/assets/1140c5b0-bf7c-4677-8a8c-170336a0c4e6)

## 7.Revisão e merge:

Merge serve para juntar a sua Branch com a MAIN.

Para realizar o Merge é necessário a aprovação, para isso é recomendado marcar o Danilo, responsável por permitir o Merge com a MAIN, para que o processo seja mais rápido.

![Image](https://github.com/user-attachments/assets/20cfd8d0-dc31-4a10-aeac-1cbb3055ae40)

<strong>OBS: Após a realização do Merge, é recomendado excluir a sua Branch para manter a organização.</strong>

## 8.Fechamento da issue:

Após a realização do Merge, vá para a pagina de issues e arraste a tarefa para `pronto`.

![Image](https://github.com/user-attachments/assets/cb85ef57-b0ed-4681-a5ed-6372571eea72)

Assim finalizando a tarefa.

## 9.Screenshots:

![Image](https://github.com/user-attachments/assets/818bd5c1-3dd6-4ffd-a976-13aa2e1092c6)

![Image](https://github.com/user-attachments/assets/18ecff7f-bf35-47b8-bc90-07149e4b5d93)

![Image](https://github.com/user-attachments/assets/7189e147-c978-484c-b15a-0c770b8d325b)
