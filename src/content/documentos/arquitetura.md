---
title: Arquitetura
---
# Arquitetura da Infraestrutura

Última atualização: 23.03.31

## Descrição

Uma infraestrutura mínima para o desenvolvimento de software, com foco em desenvolvimento web. Com no mínimo dois ambientes para cada aplicação.

## Aplicações

- SiteFábrica.
- SGE
- Consultório na Rua
- RepoIF
- GeekIF

### Organização

Coolify como servidor principal e controlador de proxy. O servidor principal é responsável por hospedar as aplicações e o controlador de proxy é responsável por redirecionar as requisições para as aplicações.

- prod: https://sge.fabsoftware.itp.ifsp.edu.br
- test: https://testsge.fabsoftware.itp.ifsp.edu.br
- prod: https://consultorionarua.fabsoftware.itp.ifsp.edu.br
- test: https://testconsultorionarua.fabsoftware.itp.ifsp.edu.br
- prod: https://repoif.fabsoftware.itp.ifsp.edu.br
- test: https://testconsultorionarua.fabsoftware.itp.ifsp.edu.br
