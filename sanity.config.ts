import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  name:      'senpai-spot',
  title:     'Senpai Spot',
  projectId: 'ttm6ob66',
  dataset:   'production',
  basePath:  '/studio',
  plugins: [
    structureTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
