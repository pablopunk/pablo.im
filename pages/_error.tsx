function ErrorPage({ statusCode }) {
  return (
    <div className="flex items-center justify-center h-full text-6xl text-red-400">
      <p>{statusCode ? `Error ${statusCode}` : "Error on client"}</p>
    </div>
  )
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default ErrorPage
