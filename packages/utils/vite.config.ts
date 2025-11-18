import { generateConfig } from '../../build/build.config'

export default generateConfig({
  name: '@dj-lib/utils',
  external: ['lodash-es'],
  globals: {
    'lodash-es': 'LodashEs',
  },
})
