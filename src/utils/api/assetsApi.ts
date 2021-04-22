import { ExplorerApi as AssetsApi } from 'atomicassets'

export const assetsApi = new AssetsApi(
  process.env.NEXT_PUBLIC_ATOMIC_ASSETS,
  'atomicassets',
  { fetch },
)
