import { Global } from '@emotion/react'
import { FC } from 'react'

import base from './base'
import { fonts } from './fonts'

export const GlobalStyles: FC = () => {
  return (
    <>
      <Global styles={fonts} />
      <Global styles={base} />
    </>
  )
}
