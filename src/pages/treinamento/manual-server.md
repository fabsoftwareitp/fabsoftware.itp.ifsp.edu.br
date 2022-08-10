---
template: "page"
title: "Manual de acesso ao WebServer"

author: "Vitor Gabriel de Aquino"
name: "Manual do WebServer"
---

# Como acessar o servidor da Fábrica de Software
Primeiramente, é necessário que se tenha instalado o SSH em sua máquina, que ele servirá de ponte entre seu computador e o servidor, após isso, o processo de conexão é bem simples, começe pelo seguinte comando no seu terminal:
ssh devops@10.112.70.230 (esse último é o endereço IP, que nesse caso é o usado para fazer o procedimento em computadores conectados à rede do campus)
Com isso o terminal irá te pedir uma senha, use a que o seu instrutor no projeto o informou.

## Informações Úteis
Dando um "ls" você verá várias pastas, aqui está um mini guia do que será necessário fazer uso:

/etc/apache2/sites-enable/

> Aqui estão todos os arquivos dos site que atualmente está sendo hospedado pelo servidor.

/var/www/

> Aqui estão os arquivos de vários projetos, ainda em desenvolvimento, para que depois sejam adicionados ou atualizados na outra pasta citada.

## Outro Método 
Em seu explorador de arquivos do Linux pode existir uma opção chamada "conectar à uma rede", clique nela e depois insira "devops@10.112.70.230", que é o endereço e o usuário que será acessado, novamente, insira sua senha, e após isso o próprio explorador de arquivos terá acesso ao servidor, assim te dando uma interface visual, um pouco mais fácil de ser trabalhada, para que possa ser realizado o gerenciamento de arquivos.
