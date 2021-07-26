import { templateRegistro } from "./pages/templateRegistro.js";
import { templateInicioSesion } from "./pages/templateInicioSesion.js";
import { home } from "./pages/templateHome.js";
import { listenersPosts, listarPosts } from "./fireBase/postController.js";
import { registerUser, signIn,logOut, openModal, closeModal, logInGoogle } from "./fireBase/auth.js";

// changeRouter funcion para elegir la ruta a la que me dirijo
export const changeRouter = (hash) => {
  const root = document.getElementById("root");

 // firebase.auth().onAuthStateChanged((user) => {
    // if (user) {
    //   switch (hash) {
    //     case "#/home":
    //       root.innerHTML = home;
    //       listenersPosts();
    //       listarPosts();
    //       logOut();
    //       break;
    //     default:
    //       window.location.hash = "#/home";
    //   }
    // } else {
      switch (hash) {
        case '':
        case '#':
        case "#login":
           root.innerHTML = templateInicioSesion();
          signIn();
          openModal();
          closeModal();
          registerUser();
          logInGoogle();
          break;
          case "#home":
                   root.innerHTML = home;
                   listenersPosts();
                   listarPosts();
                   logOut();
                   break;
        default:
          window.location.hash = "";
      }
  //  }
  //});
};
