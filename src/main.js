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
  faGem,
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
} from "@fortawesome/free-solid-svg-icons";
import { faGem as fG } from "@fortawesome/free-regular-svg-icons";

/* add icons to the library */
library.add(faGithub);
library.add(faVolumeHigh);
library.add(faVolumeXmark);
library.add(faGear);
library.add(faInfo);
library.add(faSpinner);
library.add(faGem);
library.add(fG);
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

export const SERVER_URL = "localhost:9000";
const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
app.use(vuetify);
app.mount("#app");
