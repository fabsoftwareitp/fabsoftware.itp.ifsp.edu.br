// keystatic.config.js
import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
    storage: {
        kind: 'local',
        // repo: {
        //     owner: 'fabsoftwareitp',
        //     name: 'fabsoftware.itp.ifsp.edu.br'
        // }   
    },
    collections: {
        projetos: collection({
            label: 'Projetos',
            slugField: 'title',
            path: 'src/content/projetos/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Título' } }),
                imgs: fields.array(
                    fields.image({
                        label: 'Imagens',
                        directory: 'public/images/projetos',
                        publicPath: '/images/projetos/',
                    }),
                    {
                        label: 'Imagens',
                    }
                ),
                link: fields.text({
                    label: 'URL do projeto',
                }),
                destaque: fields.checkbox({
                    label: 'Destaque',
                    description: 'Definir como destaque na página inicial'
                }),
                content: fields.markdoc({ label: 'Content', extension: 'md' }),
            },
        }),
        membros: collection({
            label: 'Membros',
            slugField: 'title',
            path: 'src/content/membros/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Título' } }),
                status: fields.checkbox({ label: 'Membro ativo?', defaultValue: false }),
                name: fields.text({label: 'Nome'}),
                avatar: fields.text({label: 'Link para o avatar do github'}),
                position: fields.text({label: 'Cargo'}),
                date: fields.text({label: 'Time'}),
                testimonial: fields.conditional(
                    fields.checkbox({ label: 'Tem depoimento?', defaultValue: false }),
                    {
                        true: fields.object({
                            depoimento: fields.text({label: 'Depoimento', multiline: true}),
                            video: fields.text({label: 'Link do vídeo'}),
                        }),
                        false: fields.empty(),
                    }
                ),
                content: fields.markdoc({ label: 'Content', extension: 'md' }),
            },
        }),
        documento: collection({
            label: 'Documento',
            slugField: 'title',
            path: 'src/content/documentos/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Título' } }),
                content: fields.markdoc({ label: 'Content', extension: 'md' }),
            },
        }),
    },     
    singletons: {
        sobre: singleton({
            label: 'Sobre',
            path: 'src/pages/sobre',
            format: { contentField: 'content' },
            schema: {
                layout: fields.ignored(),
                title: fields.ignored(),
                content: fields.markdoc({ label: 'Content', extension: 'md' }),
            }
          }),
    }, 
    ui: {
        brand: { 
          name: 'Fabsoftware',
          mark: () => {
            return <img src={'/logo-claro.svg'} height={24} />
          }
        }
    }
});