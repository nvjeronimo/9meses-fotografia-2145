import { Redirect, Route, Switch } from "wouter";
import { Provider } from "./components/provider";
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
import Cookies from "./pages/cookies";
import Vouchers from "./pages/vouchers";
import Faq from "./pages/faq";
import Contact from "./pages/contact";
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
  cookies: Cookies,
  vouchers: Vouchers,
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
        {/* Old or guessed addresses land on the real page instead of a soft 404. */}
        <Route path="/contactos">
          <Redirect to={PAGES.contact.pt} replace />
        </Route>
        <Route path="/en/contacts">
          <Redirect to={PAGES.contact.en} replace />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Provider>
  );
}

export default App;
