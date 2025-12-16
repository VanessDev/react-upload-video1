import { useState } from "react";
import "../../assets/style/UploadPage.css";

function UploadVideo() {

  const [message, setMessage] = useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    console.log("handleSubmit ok");

    const formData = new FormData(e.target);
    console.log(formData);

    try {

      const response = await fetch("http://http://localhost:3000/api/video/", {
        methode: "POST",
        body: formData
      });

      const data = await response.json();
      console.log(data);
      
      if (response.ok) {
        setMessage("Vidéo uploadée avec succès");
      } else {
        setMessage(data.error || "Erreur upload");
      }

    } catch (error) {
      setMessage("Erreur serveur");
    }
    
  }

  return (
    <div className="upload-page">
        <div className="upload-section">
          <h2 className="upload-title-page">Ajouter votre vidéo</h2>
          <p>
            Pour uploader votre fichier vidéo, vous devez respecter ces
            contraintes : vidéo entre 1 seconde et 1 minute, format mp4 et une
            taille maximum de 1gb.
          </p>

          <form onSubmit={handleSubmit} className="upload-form">
            <div className="intem-form">
              <label htmlFor="">Vidéo</label>
              <input type="file" accept="mp4" />              
            </div>
            <div className="intem-form">
              <label htmlFor="">Titre de la vidéo</label>
              <input type="text" placeholder="Saisisez le titre"/>              
            </div>
            <div className="intem-form">
              <label htmlFor="">Thème</label>
              <select name="thème" id="thème">
                <option value="">Choisir le théme de la vidéo</option>
              </select>              
            </div>
            <div className="intem-form">
              <label htmlFor="">Description</label>
              <textarea type="text" placeholder="Description"/>              
            </div>
            <button className="btn-upload">Ajouter</button>
          </form>       
        </div>
    </div>
  );
}

export default UploadVideo;