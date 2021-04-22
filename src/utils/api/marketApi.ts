import { ExplorerApi as MarketApi } from '@schoenwald/atomicmarket'

export const marketApi = new MarketApi(
  process.env.NEXT_PUBLIC_ATOMIC_ASSETS,
  'atomicmarket',
  { fetch },
)
