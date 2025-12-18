import { useState } from "react";
import "../../assets/style/UploadPage.css";

function UploadVideo() {
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setMessage("");
    console.log("handleSubmit ok");

    const formData = new FormData(e.target);

   
    try {
      const response = await fetch("http://localhost:3000/api/video", {
        method: "POST",     
        body: formData,    
      
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setMessage("Vidéo uploadée avec succès");
        e.target.reset(); //reset du formulaire
      } else {
        setMessage(data.error || "Erreur upload");
      }
    } catch (error) {
      console.error(error);
      setMessage("Erreur serveur");
    }
  }

  return (
    <div className="page">
      <div className="upload-section">
        <h2 className="upload-title-page text-primary">Ajouter votre vidéo</h2>
        <p>
          Pour uploader votre fichier vidéo, vous devez respecter ces contraintes :
          vidéo entre 1 seconde et 1 minute, format mp4 et une taille maximum de 1gb.
        </p>

        <form onSubmit={handleSubmit} className="upload-form">
          <div className="intem-form">
            <label htmlFor="video">Vidéo</label>
            <input type="file" name="video" accept="video/*" required className="file-input file-input-primary"/>
          </div>

          <div className="intem-form">
            <label htmlFor="title">Titre de la vidéo</label>
            <input type="text" name="title" placeholder="Saisisez le titre" required className="input input-primary"/>
          </div>

          <div className="intem-form">
            <label htmlFor="theme">Thème</label>
            <select name="theme" id="theme" required className="select select-primary">
              <option value="">Choisir le thème de la vidéo</option>
              <option value="fantasy">Fantasy</option>
              <option value="nature">Nature</option>
            </select>
          </div>

          <div className="intem-form">
            <label htmlFor="description">Description</label>
            <textarea name="description" placeholder="Description" className="textarea textarea-primary"/>
          </div>

          <button className="btn btn-primary btn-upload">Ajouter</button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default UploadVideo;
