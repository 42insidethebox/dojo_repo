import { i18n } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  // If baseUrl contains a pathname after the domain, use this as the home link
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = url.pathname

  return (
    <article class="popover-hint" style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404</h1>
      <img 
        src="/static/forbidden.png" 
        alt="Forbidden scroll" 
        style={{ maxWidth: "300px", margin: "1.5rem auto", display: "block" }} 
      />
      <p>🥋 Oooopsie — this one is sealed in the dojo archives.</p>
      <p><em>(Private notes stay private, no gold coins required.)</em></p>
      <p>{i18n(cfg.locale).pages.error.notFound}</p>
      <a href={baseDir}>{i18n(cfg.locale).pages.error.home}</a>
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
