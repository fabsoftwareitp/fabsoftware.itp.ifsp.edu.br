---
title: Proxmox e Docker
---
# Proxmox e Docker

## Instalar o container docker no proxmox

1. Crie uma imagem LXC. Usei a Ubuntu 20.04 LTS.
1. Vai pedir para atualizar a imagem, então faça isso.
1. Instale o `curl` com `apt get install curl`. Ele não vem na imagem.
1. Instale o docker com: `curl -fsSL https://get.docker.com -o get-docker.sh`
1. O docker não está na inicialização do sistema, precisa verificar como ativar isso
1. Tem que instalar `apt-get -y install build-essential nghttp2 libnghttp2-dev libssl-dev`. Principalmente o `libssl-dev`

## Configurar o Coolify para container Remoto com Docker

1. Gere o par de chaves para o servidor remoto (container lxc-docker) com o comando `ssh-keygen`
1. Copie o conteúdo da chave pública (`cat id_rsa` para um novo arquivo `nano authorized_keys`. Ambos arquivos devem estar na mesma pasta `root` na raiz do sistema (recomendação do coolify).
1. Copie o conteúdo da **chave privada**, `cat id_rsa`. Coloque esse conteúdo na instância do coolify em settings -> ssh keys.
1. Teste a conexão.
1. Problema agora está no DNS, ele consegue conversar com o container mas não consegue resolver o endereço.
