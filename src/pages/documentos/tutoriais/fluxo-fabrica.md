---
layout: ../../../layouts/GenericLayout.astro
title: "Fluxo de trabalho da Fábrica"

name: "Git e Github"
---
# Fluxo de trabalho da Fábrica



## Deploy
Publicação da aplicação em **servidores** de staging e produção.

### Setup para o servidor
**Essas configurações já estão realizadas no servidor!!**

A estrutura de pastas deve ser criada para que o deploy seja realizado. É importante que as permissões da pasta do usuário estejam corretas para que o acesso seja garantido. Use o comando `chown devops:devops /suapasta` para trocar o dono das pastas caso necessário.

Configure o seu `.env` com as configurações necessárias para o deploy:

```
DEPLOY_REPOSITORY=
DEPLOY_SERVER=
DEPLOY_PATH= 
```

A partir desse ponto, use o comando `envoy run init`. Esse comando irá criar a estrutura necessária de pastas para o controle das releases.

![Estrutura depois do init](/assets/tutoriais/deploy-ls-after-init.png)

Garanta as permissões necessárias para a pasta storage:
`sudo chown -R $USER:www-data storage/` e `chmod -R 775 storage`


Configure o arquivo `.env` do servidor que está na pasta raiz do `DEPLOY_PATH` configurado. Adicione as informações de conexão com o banco de dados bem como a base de dados a ser utilizada (essa base de dados já deve existir).

No servidor deve existir a configuração disponibilizando um endereço para a aplicação online. No caso do apache atual, temos um alias apontando pro caminho:

`Alias /stag.sge         /var/www/sge/stag/current/public`

Caso repositório for publico, pode se usar o ednereço via https. Se o repositório for privado, deve se criar uma chave de deploy no github. Usando o comando `cat id_rsa.pub` pegue a chave publica e adicione no github como chave de deploy.

### Deployando
Você precisa ter o envoy instalado em sua máquina, caso não tenha instale com o comando: `composer global require "laravel/envoy"`

Para realizar o deploy, utilize o comando: `envoy run deploy`. A aplicação irá pedir o seu prontuário e a sua senha para acesso liberar o acesso a internet (necessário para que o servidor possa fazer um pull do repositório). Além disso irá pedir a senha de acesso ao SSH.

As configurações padrões estão para usar a banch `develop` como padrão, caso queira fazer deploy de outra branch, use o parametro `branch=nome-da-sua-branch-aqui`. Exemplo: `envoy run deploy --branch=feature123`.

Se tudo ocorrer bem você receberá uma mensagem de `Deployment (20220901171117) finished` que contém o número do deploy realizado. Qualquer problema no deploy você deve conferir e resolver.

### Promoção para prod
Após a versão ser testada nos ambientes de staging, a aplicação deve ser promovida para o servidor de produção. 

Essa operação é importante e deve se tomar cuidados ao realizá-la.
