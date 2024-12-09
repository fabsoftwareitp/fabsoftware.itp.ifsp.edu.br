// keystatic.config.js
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
    ui: {
        brand: { 
          name: 'Fabsoftware',
          mark: () => {
            return <img src={'/logo-claro.svg'} height={24} />
          }
        }
    }
});