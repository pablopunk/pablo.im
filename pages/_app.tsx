import React, { type FunctionComponent } from "react"
import "tailwindcss/tailwind.css"
import "styles/global.css"
import { Page } from "components/Layout"
import { SITE_DESCRIPTION, SITE_NAME } from "config"
import { AuthProvider, DatabaseProvider } from "db"
import { NextSeo } from "next-seo"
import Head from "next/head"

const App: FunctionComponent<unknown> = ({ Component, pageProps }) => (
  <>
    <Head>
      <link rel="shortcut icon" href="/favicon.png" />
    </Head>
    <DatabaseProvider>
      <AuthProvider>
        <Page>
          <NextSeo title={SITE_NAME} description={SITE_DESCRIPTION} />
          <Component {...pageProps} />
        </Page>
      </AuthProvider>
    </DatabaseProvider>
  </>
)

export default App
