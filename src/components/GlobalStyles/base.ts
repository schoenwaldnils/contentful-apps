import { css } from '@emotion/react'

export default css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    word-break: break-word;
  }

  html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 16px;
    font-weight: 300;
    line-height: 1.5;
    -webkit-print-color-adjust: exact;
  }

  body {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #000;
    text-rendering: optimizeLegibility;
  }

  @media print {
    body {
      padding: 0;
      color: #000;
      background-color: transparent;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }
`
