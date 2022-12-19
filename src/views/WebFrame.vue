<template>
  <head>
    <link
      as="image"
      href="@/assets/images/background-universe.jpg"
      rel="prefetch"
    />
  </head>
  <div class="main-body h-100">
    <nav class="navbar navbar-expand-sm navbar-dark border-bottom pb-2 fs-4">
      <div class="container">
        <a class="navbar-brand" href="/">
          <img
            alt="logo"
            class="logo"
            height="40"
            loading="lazy"
            src="src/assets/images/favicon.ico"
            width="40"
          />
        </a>
        <button
          aria-controls="navbarNavAltMarkup"
          aria-label="Toggle navigation"
          class="navbar-toggler ms-auto"
          data-bs-target="#n_bar"
          data-bs-toggle="collapse"
          type="button"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="n_bar" class="collapse navbar-collapse">
          <ul class="navbar-nav nav-fill">
            <li class="nav-item active">
              <a class="nav-link" href="/">
                <font-awesome-icon
                  class="mt-1"
                  icon="gamepad"
                  size="1x">
                </font-awesome-icon>
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/about">
                <font-awesome-icon
                  class="mt-1"
                  icon="info-circle"
                  size="1x">
                </font-awesome-icon>
                About
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                id="navbarDarkDropdownMenuLink"
                aria-expanded="false"
                class="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                role="button"
              >
                <font-awesome-icon
                  class="mt-1"
                  icon="bars"
                  size="1x">
                </font-awesome-icon>
                More
              </a>
              <ul
                aria-labelledby="navbarDarkDropdownMenuLink"
                class="dropdown-menu dropdown-menu-dark"
              >
                <li>
                  <a class="dropdown-item" href="/game-plain"
                  >Game Plain</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="/status-plain">Game Status</a>
                </li>
              </ul>
            </li>
          </ul>
          <button
            class="btn btn-light ms-auto"
            data-bs-target="#loginModal"
            data-bs-toggle="modal"
          >
            <font-awesome-icon
              class="mt-1"
              icon="user"
              size="1x">
            </font-awesome-icon>
            Login
          </button>
          <div class="dropdown my-1 mx-3">
            <button
              id="dropdownChat"
              aria-expanded="false"
              aria-haspopup="true"
              class="btn btn-transparent dropdown-toggle text-light"
              data-bs-toggle="dropdown"
              data-toggle="dropdown"
              type="button"
            >
              <font-awesome-icon
                class="mt-1"
                icon="message"
                size="1x">
              </font-awesome-icon>
            </button>
            <div aria-labelledby="dropdownChat" class="dropdown-menu p-0">
              <ChatPopup></ChatPopup>
            </div>
          </div>
          <div class="dropdown mr-3 my-1">
            <button
              id="dropdownMenuButton"
              aria-expanded="false"
              aria-haspopup="true"
              class="btn btn-outline-light dropdown-toggle"
              data-bs-toggle="dropdown"
              data-toggle="dropdown"
              type="button"
            >
              <font-awesome-icon
                class="mt-1"
                icon="gear"
                size="1x">
              </font-awesome-icon>
            </button>
            <div
              aria-labelledby="dropdownMenuButton"
              class="dropdown-menu text-center settings"
            >
              <button
                class="dropdown-item"
                data-bs-target="#help"
                data-bs-toggle="modal"
              >
                <font-awesome-icon
                  class="mt-1"
                  icon="question-circle"
                  size="1x">
                </font-awesome-icon>
                Help
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- preload image -->
    <img
      alt=""
      class="img-responsive"
      src="@/assets/images/background-universe.jpg"
    />

    <!-- content -->
    <slot></slot>

    <footer class="footer border-top">
      <div class="container">
        <div
          class="d-flex flex-wrap justify-content-lg-center align-items-center"
        >
          <div
            class="col-md-5 d-flex align-items-center justify-content-lg-between"
          >
            <a
              class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
              href="https://github.com/Ostabo/Hexxagon-WA"
            >
              <img alt="" height="30" src="@/assets/images/github.png" />
            </a>
            <span class="m-3">2022 Hexxagon - AIN</span>
            <a
              class="text-muted small text-decoration-none"
              href="https://github.com/naedmi"
            >
              Nadine Görzen
            </a>
            <a
              class="text-muted small text-decoration-none"
              href="https://github.com/Ostabo"
            >
              Oskar Borkenhagen
            </a>
          </div>
        </div>
      </div>
    </footer>

    <!-- Modal Login -->
    <div id="loginModal" aria-hidden="true" class="modal fade" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form action="">
            <div class="modal-header">
              <h5 class="modal-title">Login</h5>
              <button
                aria-label="Close"
                class="btn-close"
                data-bs-dismiss="modal"
                type="button"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <v-text-field
                  class="mb-2"
                  label="E-Mail"
                ></v-text-field>
              </div>
              <div class="mb-3">
                <v-text-field
                  label="Password"
                  placeholder="Enter your password"
                ></v-text-field>
              </div>
              <div class="mb-3">
                <a href="#">Forgot Password?</a>
              </div>
            </div>
            <div class="modal-footer pt-4 justify-center">
              <v-btn
                color="deep-purple darken-4"
                variant="outlined">
                Login
              </v-btn>
            </div>
            <p class="text-center">
              Don't have an account yet? <a href="#">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal Help-->
    <div id="help" aria-hidden="true" class="modal fade" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Help</h5>
            <button
              aria-label="Close"
              class="btn-close"
              data-bs-dismiss="modal"
              type="button"
            ></button>
          </div>
          <div class="modal-body">
            <p class="p-4">
              Issues fix themselves if you refresh the page.<br />
              <strong>F5</strong> is your friend.
            </p>
          </div>
          <div
            class="modal-footer pt-4 justify-content-center align-content-center"
          >
            If you have any questions, please contact us @@
            <a href="https://github.com/Ostabo/Hexxagon-WA">
              <img
                alt="Github"
                class="w-100"
                src="src/assets/images/GitHub_Logo_White.png"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import ChatPopup from "@/components/ChatPopup.vue";

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

export default {
  name: "WebFrame",
  components: { ChatPopup, FontAwesomeIcon },
  data() {
    return {
      isCollapsed: true
    };
  },
  mounted() {
    const theme = localStorage.getItem("theme");
    if (theme === "dark" || (theme === null && prefersDarkScheme.matches)) {
      document.documentElement.classList.add("dark-theme");
      document.documentElement.classList.remove("light-theme");
      // document.getElementById("toggle").checked = true;
      // document.getElementById("toggle-container").title = "Dark";
    } else {
      document.documentElement.classList.add("light-theme");
      document.documentElement.classList.remove("dark-theme");
      // document.getElementById("toggle").checked = false;
      // document.getElementById("toggle-container").title = "Light";
    }
  },
  methods: {
    themeInit() {
    },
    toggleTheme() {
      document.documentElement.classList.toggle("dark-theme");
      document.documentElement.classList.toggle("light-theme");
      if (document.documentElement.classList.contains("dark-theme")) {
        document.getElementById("toggle-container").title = "Dark";
        localStorage.setItem("theme", "dark");
      } else {
        document.getElementById("toggle-container").title = "Light";
        localStorage.setItem("theme", "light");
      }
    }
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: Hexa;
  src: url("src/assets/Hexa.ttf");
}

.light-theme {
  textarea,
  .dropdown-menu-dark,
  .modal-content,
  main,
  .card:not(:is(section .card)),
  .toast-container *,
  #chat {
    background: rgb(185, 185, 185);
    color: black;
  }

  .main-body,
  footer,
  nav,
  a {
    color: black;
  }
}

.dark-theme {
  textarea,
  .dropdown-menu-dark,
  .modal-content,
  main,
  .card:not(:is(section .card)),
  .toast-container *,
  #chat {
    background: rgba(40, 40, 40, 1);
    color: white;
  }

  .main-body,
  footer,
  nav,
  a {
    color: white;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fade-in {
  animation: 1s fade-in ease-in;
}

.main-body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  min-height: 100vh;

  nav ul {
    gap: 1vw;
  }

  .img-responsive {
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
  }

  main {
    min-height: 86.45vh;
  }

  .settings {
    min-width: min-content;
    left: 50%;
    transform: translateX(-50%);

    .dropdown-item {
      margin-top: 1vmin;
    }
  }

  h1.welcome {
    font-family: Hexa, serif;
    font-size: 4em;
    font-weight: 100;
    text-shadow: black 0 0 1em;
  }

  .header {
    font-size: 2rem;
    display: flex;
    align-content: center;
    justify-content: space-between;
    min-width: 50%;
    margin-bottom: 2em;
  }

  textarea {
    display: block;
    min-width: 740px;
    height: 740px;

    font-size: 1.8em;
    text-align: left;
    padding: 1em;
    border: none;
    resize: none;
    outline: none;

    font-family: revert;
    line-height: initial;
  }
}

#game-over {
  display: none;
}
</style>
