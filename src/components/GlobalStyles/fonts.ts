import { css } from '@emotion/react'

const weights = ['Light', 'Regular', 'Medium', 'Black', 'Bold']

const fontWeights = {
  Light: 300,
  Regular: 400,
  Medium: 500,
  // Bold: 700,
  Black: 900,
}

const fontStyle = (weight: string) => css`
  @font-face {
    font-family: 'Trasandina';
    src: url('/fonts/trasandina/Trasandina-W03-${weight}.woff2') format('woff2'),
      url('/fonts/trasandina/Trasandina-W03-${weight}.woff') format('woff');
    font-display: swap;
    font-weight: ${fontWeights[weight]};
  }

  @font-face {
    font-family: 'Trasandina';
    src: url('/fonts/trasandina/Trasandina-W03-${weight}-Italic.woff2')
        format('woff2'),
      url('/fonts/trasandina/Trasandina-W03-${weight}-Italic.woff')
        format('woff');
    font-display: swap;
    font-weight: ${fontWeights[weight]};
    font-style: italic;
  }
`

export const fonts = css`
  ${weights.map((weight) => fontStyle(weight))}
`
