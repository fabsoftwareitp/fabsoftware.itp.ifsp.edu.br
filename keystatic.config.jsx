// keystatic.config.js
import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: {
        kind: 'local',
    },
    collections: {
        projetos: collection({
            label: 'Projetos',
            slugField: 'title',
            path: 'src/content/projetos/*',
            format: { contentField: 'content' },
            schema: {
                layout: fields.select({
                    label: 'Layout',
                    options: [
                      { label: 'MarkDownLayout', value: '../../layouts/MarkDownLayout.astro' },
                    ],
                    defaultValue: '../../layouts/MarkDownLayout.astro'
                }), 
                title: fields.slug({ name: { label: 'Título' } }),
                img: fields.image({
                    label: 'Capa',
                    directory: 'public/images/projetos',
                    publicPath: '/images/projetos/'
                }),
                imgs: fields.conditional(
                    fields.checkbox({ label: 'Há mais de uma imagem?', defaultValue: false }),
                    {
                        true: fields.array(
                            fields.image({
                            label: 'Imagens',
                            directory: 'public/images/equipamentos',
                            publicPath: '/images/equipamentos/',
                            }),
                            {
                            label: 'Imagens',
                            }
                        ),
                        false: fields.empty(),
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
                layout: fields.select({
                    label: 'Layout',
                    options: [
                      { label: 'MarkDownLayout', value: '../../layouts/MarkDownLayout.astro' },
                    ],
                    defaultValue: '../../layouts/MarkDownLayout.astro'
                }), 
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
            path: 'src/content/membros/*',
            format: { contentField: 'content' },
            schema: {
                layout: fields.select({
                    label: 'Layout',
                    options: [
                      { label: 'MarkDownLayout', value: '../../layouts/MarkDownLayout.astro' },
                    ],
                    defaultValue: '../../layouts/MarkDownLayout.astro'
                }), 
                title: fields.slug({ name: { label: 'Título' } }),
                content: fields.markdoc({ label: 'Content', extension: 'md' }),
            },
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