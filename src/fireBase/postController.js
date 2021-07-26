import { crearPost, obtenerPost } from "./post.js"

var imagenURL;


function listenersPosts() {
  document.getElementById('btnCrearPost').addEventListener('click',()=>{  
    let comentario = document.getElementById('textPost').value
    crearPost('autor', comentario , imagenURL )
  })
}

//DINAMISMO PARA MOSTRAR POST DE DATABASE
function listarPosts() {
  obtenerPost((querySnapshot)=>{
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      let data = doc.data()
      const divPost = document.createElement('div')
      divPost.classList.add('card') 
      divPost.innerHTML = `
      <div class="boxInformation">
      <h1>${data.autor}</h1>
      <h2>${data.comentario}</h2>
      <p>${data.fecha}</p>
    </div>
    <div class="boxBtn">
      <div class="button-container like-container">
        <a class = "likeAndDislike" href="#">
          <i onclick="count()" class="fa fa-heart-o">  Like</i> 
          <br>
        </a>
      </div>
      <div class="button-container dislike-container">
        <a class = "likeAndDislike" href="#">
        <i onclick="count1()" class="fas fa-heart-broken">  Dislike</i>
        <br>

        </a>
      </div>
    </div>
      `
    document.getElementById('boxPosted').appendChild(divPost)
  });
  })
}
//OBTENER IMAGEN PARA POTS
function listenerFile() {
  var uploader = document.getElementById('uploader');
  document.getElementById('file').addEventListener('change', (e) =>{
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref('imagen/'+file.name);
    var task = storageRef.put(file);
    
    task.on('state_changed', function progress(snapshot) {
        var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        uploader.value = percentage;
    
      }, function error(err) {
        console.error(err)
    
      }, function complete() {
        alert("completado");
        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          imagenURL = downloadURL
        });
      });

    });
}




export { listenersPosts, listarPosts, listenerFile  }
