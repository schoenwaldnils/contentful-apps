import styled from '@emotion/styled'

import { NftImage } from './NftImage'

const Container = styled.div`
  max-width: 320px;
`

export default {
  title: 'NFT / NftImage',
  component: NftImage,
}

const defaultArgs = {
  img: 'https://picsum.photos/320/320',
}

const Template = (args) => (
  <Container>
    <NftImage {...{ ...defaultArgs, ...args }} />
  </Container>
)

export const Default = Template.bind({})

export const WithBackImage = Template.bind({})

WithBackImage.args = {
  imgBack: 'https://picsum.photos/321/321',
}
