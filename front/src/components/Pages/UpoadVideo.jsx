function UploadVideo() {
  return (
    <>
      <h1>Uploader une vidéo</h1>
      <main>
        <p>
          Pour uploader votre fichier vidéo, vous devez respecter ces
          contraintes : vidéo entre 1 seconde et 1 minute, format mp4 et une
          taille maximum de 1gb.
        </p>

        <div>
          <input type="file"
          accept="mp4" />
          <input type="text" placeholder="Saisir le titre"/>
          <select name="thème" id="thème">Thème</select>
          <input type="text" placeholder="Description"/>
        </div>

        <button>Uploader</button>
      </main>
    </>
  );
}

export default UploadVideo;
