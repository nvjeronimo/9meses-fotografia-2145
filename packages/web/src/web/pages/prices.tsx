import { PackagesView } from "./packages";

/** Unlisted: every package with its price, for the studio to send to whoever asks (see PRICES_PUBLIC). */
function Prices() {
  return <PackagesView full />;
}

export default Prices;
