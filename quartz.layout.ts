import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// single-note pages
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => page.fileData.slug !== "index", // keep homepage clean
    }),
    Component.TagList(),

    // ✅ Always show a local graph (home included)
    Component.Graph({
      localGraph: {
        drag: true,
        zoom: true,
        depth: 1,             // neighbors of this page
        scale: 1.0,
        repelForce: 0.6,
        centerForce: 0.25,
        linkDistance: 34,
        fontSize: 0.7,
        opacityScale: 1.0,
        showTags: true,
        removeTags: [],
        focusOnHover: true,
        enableRadial: false,
      },
    }),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [
    // (Optional) keep global graph toggle in sidebar:
    Component.Graph({
      globalGraph: {
        drag: true,
        zoom: true,
        depth: -1,           // entire site
        scale: 0.9,
        repelForce: 0.5,
        centerForce: 0.2,
        linkDistance: 30,
        fontSize: 0.6,
        opacityScale: 1.0,
        showTags: true,
        removeTags: [],
        focusOnHover: true,
        enableRadial: true,
      },
    }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// list/tag/folder pages
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),

    // ✅ Same local graph before list content
    Component.Graph({
      localGraph: {
        drag: true,
        zoom: true,
        depth: 1,
        scale: 1.0,
        repelForce: 0.6,
        centerForce: 0.25,
        linkDistance: 34,
        fontSize: 0.7,
        opacityScale: 1.0,
        showTags: true,
        removeTags: [],
        focusOnHover: true,
        enableRadial: false,
      },
    }),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
