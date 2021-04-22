import Document, { Head, Html, Main, NextScript } from 'next/document'
import { ReactNode } from 'react'

const AppsDocument = (): ReactNode => {
  return (
    <Html>
      <Head />
      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  )
}

AppsDocument.getInitialProps = Document.getInitialProps

AppsDocument.renderDocument = Document.renderDocument

export default AppsDocument
