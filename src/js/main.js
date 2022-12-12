import { createApp } from "vue";
import App from "../App.vue";
import router from "../router";
// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import "../assets/main.scss";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGear, faGem, faInfo, faSpinner, faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
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

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);

app.mount("#app");
