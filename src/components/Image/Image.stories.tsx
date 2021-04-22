import { FC } from 'react'

import { Image } from './Image'

export default {
  title: 'Image',
  component: Image,
}

export const Default: FC = () => <Image src="https://picsum.photos/200/200" />

export const MissingImage: FC = () => (
  <Image src="https://www.nope.com/200/200" />
)
