import { generateVueConfig } from '../../build/build.config'

export default generateVueConfig({
  name: 'web-ui',
  external: ['@dj-lib/utils', '@dj-lib/shared'],
  globals: {
    '@dj-lib/utils': 'utils',
    '@dj-lib/shared': 'shared',
  },
})
