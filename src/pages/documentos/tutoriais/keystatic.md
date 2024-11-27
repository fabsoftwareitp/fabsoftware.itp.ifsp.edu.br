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

A página a princípio terá essa configuração como base, onde no storage, que é o local que os arquivos serão armazenados pode ser alternado para 'github' para salvar os arquivos no repositório do github. Outro ponto importante é o 'collections', que será onde serão criados as coleções. Há uma coleção de exemplo já criada nomeada como 'posts'.
