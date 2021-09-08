import React, { FunctionComponent } from 'react'
import 'tailwindcss/tailwind.css'
import 'styles/global.css'
import { Page } from 'components/Layout'
import { NextSeo } from 'next-seo'
import { SITE_DESCRIPTION, SITE_NAME } from 'config'
import Head from 'next/head'

const App: FunctionComponent<any> = ({ Component, pageProps }) => (
  <>
    <Head>
      <link rel="shortcut icon" href="/favicon.png" />
    </Head>
    <Page>
      <NextSeo title={SITE_NAME} description={SITE_DESCRIPTION} />
      <Component {...pageProps} />
    </Page>
  </>
)

export default App
