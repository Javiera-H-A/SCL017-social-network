import { crearPost, obtenerPost } from './post.js';
import { likePost, showLikes, deletePost } from './postInteraction.js';

let imagenURL = '';

function mostrarsaludo() {
  const divName = document.createElement('div');
  divName.innerHTML = ` 
  <p id="nombreUsuario"><br> !Hola, ${firebase.auth().currentUser.displayName}! </p>
  `;
  document.getElementById('nombre').appendChild(divName);
}
function mostrarNombreUsuario() {
  const divName = document.createElement('div');
  divName.innerHTML = ` 
  <p id="nombreUsuario"><br> ${firebase.auth().currentUser.displayName} </p>
  `;
  document.getElementById('nombre').appendChild(divName);
}

function mostrarPhoto() {
  const imagenUsuario = firebase.auth().currentUser.photoURL;

  if (imagenUsuario) {
    const divphoto = document.createElement('div');

    divphoto.innerHTML = ` 
        <div clase"imgMovie"><img src=${imagenUsuario} ></div>
        `;
    document.getElementById('photo').appendChild(divphoto);
  }
}

// DINAMISMO PARA MOSTRAR POST DE DATABASE
function listarPosts(idUser) {
  // console.log(idUser);
  obtenerPost(idUser, (querySnapshot) => {
    document.getElementById('boxPosted').innerHTML = '';
    querySnapshot.forEach((doc) => {
    //  console.log(`${doc.id} => ${doc.data()}`);
      const data = doc.data();
      const divPost = document.createElement('div');
      divPost.classList.add('card');
      const fecha = new Date(data.fecha.seconds * 1000).toLocaleString();
      // console.log(doc.id)
      let html = `
      <div class="boxInformation">
      <h1>${data.autor}</h1>
      <p>${fecha}</p>
      <h2>${data.comentario}</h2> `;
      if (data.imagen) {
        html += ` <div clase="imgMovie"><img src=${data.imagen} style="width: 100%";></div>`;
      }

      html += `</div>
    <div class="boxBtn">
      <div class="like-container">
      <button id='like' class='likeButton' value='${doc.id}'>
        <i class="fas fa-heart"></i>
      </button>
          <br>
          <p style="display:inlike-block;">${data.like.length} Me gusta</p>
      </div>`;
      if (firebase.auth().currentUser) {
        html += `<div>
        <button id='deletePost' value='${doc.id}' class='btnDelete'>
          <i class="fas fa-trash-alt"></i></button>
      </div>
    </div>
      `;
      }

      // esta dentro de un ciclo****
      divPost.innerHTML = html;
      document.getElementById('boxPosted').appendChild(divPost);

      const likeButton = document.querySelectorAll('#like');
      likeButton.forEach((item) => {
        item.addEventListener('click', () => likePost(item.value, item));
      });

      likeButton.forEach((item) => {
        item.addEventListener('onload', showLikes(item.value, item));
      });
    });
    // Evento para boton DELETE POST
    const btnDeleteList = document.querySelectorAll('#deletePost');
    btnDeleteList.forEach((item) => {
      item.addEventListener('click', () => deletePost(item.value));
    });
  });
}

// OBTENER IMAGEN PARA POTS
function listenerFile() {
  const uploader = document.getElementById('uploader');
  document.getElementById('file').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref(`imagen/${file.name}`);
    const task = storageRef.put(file);

    task.on('state_changed', (snapshot) => {
      const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploader.value = percentage;
    }, (err) => {
      console.error(err);
    }, () => {
      alert('completado');
      task.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
        imagenURL = downloadURL;
      });
    });
  });
}

function listenersPosts() {
  document.getElementById('btnCrearPost').addEventListener('click', () => {
    const autor = firebase.auth().currentUser.displayName;
    const comentario = document.getElementById('textPost').value;
    crearPost(autor, comentario, imagenURL);
  });
}

export {
  listenersPosts, listarPosts, listenerFile, mostrarNombreUsuario, mostrarPhoto, mostrarsaludo,
};
