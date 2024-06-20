---
layout: ../../../layouts/GenericLayout.astro
title: "Como fazer deploy das aplicações"

name: "Git e Github"
---
# Como fazer deploy das aplicações

Antes de fazer seu PR, teste as suas alterações no ambiente de produção. Para isso siga os passos abaixo:

1. Verifique se a sua branch e todas a alterções que você gostaria de verificar já estão sincronizadas com o github. Ou seja, você deve ter enviado todo o código da sua branch para o repositório remoto no github.

2. Verifique se o projeto que você está já está instalado o envoy. Rode o comando `php vendor/bin/envoy`. Caso não tenha o envoy instalado instale ele no projeto usando o `composer require laravel/envoy --dev`.

3. Para realizar o deploy, utilize o comando: `php vendor/bin/envoy run deploy --branch=feature123`. A aplicação irá pedir o seu prontuário e a sua senha para liberar o acesso a internet (necessário para que o servidor possa fazer um pull do repositório). Além disso irá pedir a senha de acesso ao SSH.

4. Se tudo ocorrer bem você receberá uma mensagem de `Deployment (20220901171117) finished` que contém o número do deploy realizado. Qualquer problema no deploy você deve conferir e resolver.

5. Acesse o endereço do projeto e verifique se a aplicação e suas mudanças estão funcionando corretamente. O ambiente configurado é o de staging, então o endereço deve ser semelhante a [https://fabsoftware.itp.ifsp.edu.br/sge.stag](https://fabsoftware.itp.ifsp.edu.br/sge.stag). Se você estiver no instituto deverá usar o IP da rede local para poder acessar.

6. Caso esteja tudo OK, crie o PR.