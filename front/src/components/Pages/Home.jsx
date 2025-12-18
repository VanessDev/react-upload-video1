import { useEffect, useState } from "react";
import "../../assets/style/Home.css";
import { getVideosList } from "../../services/ApiVideos";
import { Link, useOutletContext } from "react-router-dom";

function Home() {
  // ✅ récupère les filtres envoyés par App/Layout (où est le Header)
  const { filters } = useOutletContext();

  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");

  async function videoList() {
    try {
      setError("");
      const data = await getVideosList(filters);
      setVideos(Array.isArray(data.videos) ? data.videos : []);
    } catch (err) {
      console.error(err);
      setError("Erreur serveur");
    }
  }

  // ✅ recharge à chaque changement des filtres
  useEffect(() => {
    videoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.title, filters.theme, filters.note, filters.date]);

  return (
    <div className="home-page">
      <h2 className="upload-title-page text-primary">Bienvenue sur VIADEO !</h2>

      <div>{error && <p className="text-error">{error}</p>}</div>

      <div className="listCards">
        {videos.map((v) => (
          <Link to={`/${v.id}`} key={v.id} className="video-link">
            <div className="video-card gap-[25px]">
              <h3 className="title-video-card font-bold">{v.title}</h3>

              <video
                controls
                width="300"
                src={`http://localhost:3000/api/video/${v.id}/stream`}
                className="home-page-video"
              />

              {/* thème renvoyé par ton API : "theme" */}
              <p>{v.theme || "—"}</p>

              {/* note moyenne si ton API renvoie avg_note */}
              {"avg_note" in v && (
                <p className="opacity-70">
                  Note : {Number(v.avg_note).toFixed(1)} ⭐
                </p>
              )}

              <p className="video-card-description">{v.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
