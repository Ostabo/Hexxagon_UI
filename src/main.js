import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

import "./assets/main.scss";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faGear,
  faInfo,
  faSpinner,
  faVolumeHigh,
  faVolumeXmark,
  faGamepad,
  faAddressCard,
  faBars,
  faUser,
  faMessage,
  faKeyboard,
  faQuestionCircle,
  faInfoCircle,
  faTriangleExclamation,
  faQuoteLeft,
  faPaperPlane,
  faWifi,
  faX,
  faRefresh,
  faBoltLightning,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faGithub);
library.add(faVolumeHigh);
library.add(faVolumeXmark);
library.add(faGear);
library.add(faInfo);
library.add(faSpinner);
library.add(faGamepad);
library.add(faAddressCard);
library.add(faBars);
library.add(faUser);
library.add(faMessage);
library.add(faKeyboard);
library.add(faQuestionCircle);
library.add(faInfoCircle);
library.add(faTriangleExclamation);
library.add(faQuoteLeft);
library.add(faPaperPlane);
library.add(faWifi);
library.add(faX);
library.add(faRefresh);
library.add(faBoltLightning);

const [cS, eS] = [
  import.meta.env.BASE_URL + "/click-good.wav",
  import.meta.env.BASE_URL + "/click-bad.wav",
];
export const clickSound = new Audio(cS);
clickSound.volume = 0.4;
export const errorSound = new Audio(eS);
errorSound.volume = 0.4;
export const gameOverSound = new Audio(
  import.meta.env.BASE_URL + "/game-over.wav"
);
gameOverSound.volume = 0.4;

export const SERVER_URL = import.meta.env.PROD
  ? "https://hexxagon-web-server.onrender.com"
  : "http://localhost:9000";
export const SERVER_WS_URL = import.meta.env.PROD
  ? "wss://hexxagon-web-server.onrender.com"
  : "ws://localhost:9000";

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
app.use(vuetify);
app.mount("#app");
