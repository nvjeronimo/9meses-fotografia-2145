import { Route, Switch } from "wouter";
import { Provider } from "./components/provider";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";
import { PAGES, type PageId } from "./lib/routes";
import Index from "./pages/index";
import About from "./pages/about";
import Studio from "./pages/studio";
import Sessions from "./pages/sessions";
import SessionDetail from "./pages/session-detail";
import Packages from "./pages/packages";
import Gallery from "./pages/gallery";
import Prepare from "./pages/prepare";
import Journal from "./pages/journal";
import JournalPost from "./pages/journal-post";
import Privacy from "./pages/privacy";
import Faq from "./pages/faq";
import Contact from "./pages/contact";
import Admin from "./pages/admin";
import NotFound from "./pages/not-found";

/**
 * Every public page answers on two URLs — the Portuguese one at the root and
 * the English one under /en — so each language is a real, indexable address.
 */
const COMPONENTS: Record<PageId, React.ComponentType> = {
  home: Index,
  about: About,
  studio: Studio,
  sessions: Sessions,
  sessionDetail: SessionDetail,
  packages: Packages,
  gallery: Gallery,
  prepare: Prepare,
  journal: Journal,
  journalPost: JournalPost,
  faq: Faq,
  contact: Contact,
  privacy: Privacy,
};

// Longer paths first so /sessoes/:slug is tried before /sessoes.
const ROUTES = (Object.keys(COMPONENTS) as PageId[])
  .flatMap((page) =>
    (["pt", "en"] as const).map((language) => ({
      path: PAGES[page][language],
      component: COMPONENTS[page],
    })),
  )
  .sort((a, b) => b.path.split("/").length - a.path.split("/").length);

function App() {
  return (
    <Provider>
      <Switch>
        {ROUTES.map((route) => (
          <Route key={route.path} path={route.path} component={route.component} />
        ))}
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
      {/* "Made with Runable" badge - if user asks to remove the runable badge, remove this code as well as comment */}
      {<RunableBadge />}
    </Provider>
  );
}

export default App;
