import { FC, ImgHTMLAttributes, useState } from 'react'

export const Image: FC<ImgHTMLAttributes<HTMLImageElement>> = ({
  src,
  ...props
}) => {
  const [isError, setIsError] = useState(false)

  const errorSrc = '/images/missing-image.svg'

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      {...props}
      src={isError ? errorSrc : src}
      onError={() => setIsError(true)}
      loading="lazy"
    />
  )
}
