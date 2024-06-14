module.exports = {
  SITE_NAME: "pablo.im",
  SITE_URL:
    process.env.NODE_ENV === "production"
      ? "https://pablo.im"
      : "http://localhost:3000",
  SITE_DESCRIPTION: "URL Shortener and link manager",
}
