---
layout: ../../../layouts/GenericLayout.astro
title: "Fluxo de Git e Github da Fábrica"

name: "Git e Github"
---
# Tutorial - Como instalar e configurar o Keystatic para o Astro

Primeiramente é necessário instalar as seguintes dependências:
 - npx astro add react markdoc 
 - npm install @keystatic/core @keystatic/astro

Após isso no arquivo 'astro.config.mjs' do astro, é preciso adicionar a integração keystatic e o modo output que deve estar em hybrid, o arquivo deverá estar da seguinte forma após as configurações: 

    // astro.config.mjs
    import { defineConfig } from 'astro/config'

    import react from '@astrojs/react'
    import markdoc from '@astrojs/markdoc'

    import keystatic from '@keystatic/astro'

    // https://astro.build/config
    export default defineConfig({

    integrations: [react(), markdoc()],

    integrations: [react(), markdoc(), keystatic()],

    output: 'hybrid',
    })

Então é necessário criar um arquivo criar uma página 'keystatic.config.ts' na raiz do projeto. Este arquivo vai definir onde os arquivos vão ser salvos, e onde serão criados as coleções, que servirão como um molde para o usuário colocar as informações.

    // keystatic.config.ts
    import { config, fields, collection } from '@keystatic/core';

    export default config({
    storage: {
        kind: 'local',
    },
    collections: {
        posts: collection({
        label: 'Posts',
        slugField: 'title',
        path: 'src/content/posts/*',
        format: { contentField: 'content' },
        schema: {
            title: fields.slug({ name: { label: 'Title' } }),
            content: fields.markdoc({ label: 'Content' }),
        },
        }),
    },
    });

A página a princípio terá essa configuração como base, onde no storage, que é o local que os arquivos serão armazenados pode ser alternado para 'github' para salvar os arquivos no repositório do github. Outro ponto importante é o 'collections', que será onde serão criados as coleções. Há uma coleção de exemplo já criada nomeada como 'posts', nela é possível notar os seguintes campos:
 - label: Serve para nomear o arquivo
 - slugfield: Cria o nome de arquivo de acordo com oque o usuário inseriu no campo label. Ele é definido como title porque 'title' é o nome de um campo que será criado dentro do schema. 
 - path: O local onde os arquivos desta coleção será salvo
 - format: O formato do arquivo. Assim como o slugField é definido de acordo com o 'content' que é criado no schema.
 - schema: Onde os campos que o usuário usará para criar serão configurados.
 - title: É o campo que permite o usuário escolher o nome do arquivo.
 - content: É oque define a extensão do arquivo e é também um campo que permite o usuário escrever o conteúdo do arquivo.

 Essas são as principais configurações da coleção. Além do title e content há outros campos que podem ser adicionados a coleção, como exemplo há o campo de imagem que permite que o usuário insira uma imagem.

Para testar oque foi configurado basta acessar o caminho /keystatic, onde ficará o local que permite a criação de arquivos.

## Como renderizar o conteúdo do Keystatic em qualquer página que desejar
A exibição de conteúdo ocorre da seguinte forma: 

    import { getCollection, getEntry } from "astro:content";

    // Pega todos os arquivos md de uma pasta especificada na pasta content
    const posts = await getCollection('posts');

    // Pega um único arquivo md
    const post1 = await getEntry('posts', 'post1');

No frontmatter que você deseja exibir o conteúdo de determinado arquivo, assim como no exemplo acima, importe getCollection que servirá para acessar as pastas das coleções, e, getEntry que servirá para acessar um arquivo em específico. Após isso é necessário, assim como ilustrado no exemplo, definir uma constante que receberá os dados dos arquivos que você deseja exibir

Agora, para usar esses dados na página você precisa, no local que dejesa exibir determinada informação de um ou mais arquivos, abrir chaves e colocar assim como no exemplo:
    
    <h1>{post1.data.titulo}</h1>

Esse código pega o arquivo 'post1' e exibe os dados dele.

