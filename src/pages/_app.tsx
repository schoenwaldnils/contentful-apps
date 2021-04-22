import '@contentful/forma-36-react-components/dist/styles.css'

import { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactNode } from 'react'

import { GlobalStyles } from '../components/GlobalStyles'

const ContentfulApps = ({ Component, pageProps }: AppProps): ReactNode => {
  return (
    <>
      <Head>
        <title>Schoenwald Contentful Extensions</title>
        <script src="https://unpkg.com/@contentful/app-sdk@3.32.2" />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}

export default ContentfulApps
