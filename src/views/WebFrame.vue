<template>
  <html lang="en" class="dark-theme">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <link rel="prefetch" href="@/assets/images/background-universe.jpg" as="image">

    <title></title>

  </head>
  <body class="main-body h-100" onload="themeInit()">
  <nav class="navbar navbar-expand-sm navbar-dark border-bottom pb-2 fs-4">
    <div class="container">
      <a class="navbar-brand" href="/">
        <img src="src/assets/images/favicon.ico" alt="logo" class="logo" height="40" width="40" loading="lazy">
      </a>
      <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#n_bar" aria-controls="navbarNavAltMarkup" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="n_bar">
        <ul class="navbar-nav nav-fill">
          <li class="nav-item active">
            <a class="nav-link" href="/">
              <i class="bi bi-controller m-1"></i>Home
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/about">
              <i class="bi bi-chat-left-quote m-1"></i>About
            </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-list m-1"></i>More
            </a>
            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
              <li><a class="dropdown-item" href="/overview-plain">Game Plain</a></li>
              <li><a class="dropdown-item" href="/status">Game Status</a></li>
            </ul>
          </li>
        </ul>
        <button class="btn btn-light ms-auto" data-bs-toggle="modal" data-bs-target="#loginModal">
          <i class="bi bi-person"></i>
          Login
        </button>
        <div class="dropdown my-1 mx-3">
          <button class="btn btn-transparent dropdown-toggle text-light" type="button" id="dropdownChat" data-toggle="dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="bi bi-chat"></i>
          </button>
          <div class="dropdown-menu p-0" aria-labelledby="dropdownChat">
            <!-- Chat -->
          </div>
        </div>
        <div class="dropdown mr-3 my-1">
          <button class="btn btn-outline-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="bi bi-gear"></i>
          </button>
          <div class="dropdown-menu text-center settings" aria-labelledby="dropdownMenuButton">
            <span>
              <!-- Theme -->
            </span>
            <button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#help">
              <i class="bi bi-question-circle-fill"></i>
              Help
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- preload image -->
  <img class="img-responsive" src="@/assets/images/background-universe.jpg" alt=""/>

  <!-- content -->
  <slot></slot>

  <footer class="footer border-top">
    <div class="container">
      <div class="d-flex flex-wrap justify-content-lg-center align-items-center">
        <div class="col-md-5 d-flex align-items-center justify-content-lg-between">
          <a href=https://github.com/Ostabo/Hexxagon-WA class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
            <img alt="" src="@/assets/images/github.png" height="30">
          </a>
          <span class="m-3">2022 Hexxagon - AIN</span>
          <a class="text-muted small text-decoration-none" href="https://github.com/naedmi">
            Nadine Görzen
          </a>
          <a class="text-muted small text-decoration-none" href="https://github.com/Ostabo">
            Oskar Borkenhagen
          </a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Modal Login -->
  <div class="modal fade" id="loginModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form action="">
          <div class="modal-header">
            <h5 class="modal-title">Login</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <input type="text" name="username" class="form-control" id="email" placeholder="E-Mail">
            </div>
            <div class="mb-3">
              <input type="text" name="username" class="form-control" id="password" placeholder="Password">
            </div>
            <div class="mb-3">
              <a href="#">Forgot Password?</a>
            </div>
          </div>
          <div class="modal-footer pt-4">
            <button type="button" class="btn btn-primary mx-auto w-100">Login</button>
          </div>
          <p class="text-center">Don't have an account yet? <a href="#">Sign up</a></p>
        </form>
      </div>
    </div>
  </div>

  <!-- Modal Help-->
  <div class="modal fade" id="help" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Help</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p class="p-4">
            Issues fix themselves if you refresh the page.<br>
            <strong>F5</strong> is your friend.
          </p>
        </div>
        <div class="modal-footer pt-4 justify-content-center align-content-center">
          If you have any questions, please contact us @@
          <a href="https://github.com/Ostabo/Hexxagon-WA">
            <img class="w-100" src="src/assets/images/GitHub_Logo_White.png" alt="Github">
          </a>
        </div>
      </div>
    </div>
  </div>

  </body>
  </html>
</template>

<script>
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

export default {
  name: 'WebFrame',
  data() {
    return {
      isCollapsed: true,
    };
  },
  mounted() {
    const theme = localStorage.getItem("theme");
    if ((theme === "dark") || (theme === null && prefersDarkScheme.matches)) {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
      // document.getElementById("toggle").checked = true;
      // document.getElementById("toggle-container").title = "Dark";
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
      // document.getElementById("toggle").checked = false;
      // document.getElementById("toggle-container").title = "Light";
    }
  },
  methods: {
    themeInit() { },
    toggleTheme() {
      document.documentElement.classList.toggle('dark-theme');
      document.documentElement.classList.toggle('light-theme');
      if (document.documentElement.classList.contains('dark-theme')) {
        document.getElementById("toggle-container").title = "Dark";
        localStorage.setItem("theme", "dark");
      } else {
        document.getElementById("toggle-container").title = "Light";
        localStorage.setItem("theme", "light");
      }
    }
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: Hexa;
  src: url('src/assets/Hexa.ttf');
}

.light-theme {
  .main-body, textarea, footer, nav, a, .dropdown-menu-dark,
  .modal-content, main, .card:not(:is(section .card)), .toast-container *,
  #chat {
    background: rgb(185, 185, 185);
    color: black;
  }
}

.dark-theme {
  .main-body, textarea, footer, nav, a, .dropdown-menu-dark,
  .modal-content, main, .card:not(:is(section .card)), .toast-container *,
  #chat {
    background: rgba(40, 40, 40, 1);
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

body.main-body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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