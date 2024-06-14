import { getUrlRedirect } from "db"
import type { GetServerSidePropsContext } from "next"
import { useEffect } from "react"

export default function Url({ to }) {
  useEffect(() => {
    window.location.href = to
  }, [to])

  return <div>hello</div>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const from = context.query.url as string
  const to = await getUrlRedirect(from)

  if (!to) {
    return {
      notFound: true,
    }
  }

  context.res.writeHead(302, { Location: to })
  context.res.end()

  return {
    props: {
      to,
    },
  }
}
