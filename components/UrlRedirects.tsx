import { UrlRedirect } from 'db/types'

export default function UrlRedirects({
  redirects,
}: {
  redirects: UrlRedirect[]
}) {
  return (
    <div>
      {redirects.map((redirect) => (
        <div key={redirect.id}>
          <span>from</span>
          <a href={redirect.from}>{redirect.from}</a>
          <span>to</span>
          <a href={redirect.to}>{redirect.to}</a>
        </div>
      ))}
    </div>
  )
}
