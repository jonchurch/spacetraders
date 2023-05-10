import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: 'https://raw.githubusercontent.com/SpaceTradersAPI/api-docs/main/reference/SpaceTraders.json',
  apiFile: './emptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFile: './out/spacetraders.ts',
  exportName: 'spacetraders',
  hooks: true,
}

export default config
