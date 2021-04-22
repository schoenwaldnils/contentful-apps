import styled from '@emotion/styled'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { IoSync } from 'react-icons/io5'

import { Image } from '../Image'

export const NftImageContainer = styled.div<{ size: number }>`
  --size: ${(p) => p.size}px;
  position: relative;
  width: 100%;
  height: var(--size, auto);
`

const Img = styled(Image)`
  display: block;
  backface-visibility: hidden;
  max-height: 100%;
  object-fit: contain;
`

const Back = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
`

const ImgWrapper = styled.div`
  position: relative;
  z-index: 1;
  transition: transform 300ms ease-in-out;
  perspective: 10000vmin;
  transform-style: preserve-3d;
`

const TurnImg = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 2;
  font-size: calc(var(--size) * 0.1);
  color: #000;
  line-height: 1;
  opacity: 0.5;

  :hover + ${ImgWrapper} {
    transform: rotateY(180deg);
  }
`

const TurnImgIcon = styled(IoSync)`
  display: block;
`

export const NftImage: FC<{
  img: string
  imgBack?: string
  ratio?: number
}> = ({ img, imgBack, ratio = 1 }) => {
  const imgRef = useRef<HTMLDivElement>()
  const [size, setSize] = useState(320)

  const width = 640
  const height = width * ratio

  const setRefSize = useCallback(() => {
    if (imgRef?.current?.clientWidth) {
      setSize(imgRef.current.clientWidth)
    }
  }, [imgRef])

  useEffect(() => {
    if (imgRef?.current) {
      setRefSize()
    }
  }, [imgRef, setRefSize])

  useEffect(() => {
    window.addEventListener('resize', setRefSize)
  }, [setRefSize])

  const imageBaseUrl = 'https://ipfs.io/ipfs/'

  return (
    <NftImageContainer ref={imgRef} size={size}>
      {imgBack ? (
        <>
          <TurnImg>
            <TurnImgIcon />
          </TurnImg>
          <ImgWrapper>
            <Img
              src={`${imageBaseUrl}${img}`}
              alt=""
              width={width}
              height={height}
            />
            <Back
              src={`${imageBaseUrl}${imgBack}`}
              alt=""
              width={width}
              height={height}
            />
          </ImgWrapper>
        </>
      ) : (
        <Img
          src={`${imageBaseUrl}${img}`}
          alt=""
          width={width}
          height={height}
        />
      )}
    </NftImageContainer>
  )
}
