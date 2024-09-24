import { useEffect, useState } from 'react';
import './HomePage.scss';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, []);

  return (
    <section className="hero-section">
      <video autoPlay loop muted playsInline className="hero-video">
        <source src="../src/assets/HeroVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="hero-content">
        <h1 key={key} className="hero-heading">
          Find access to social infrastructure, <span className="fast-typing">fast</span>
        </h1>
        <p className="hero-subtitle">Help is closer than you think</p>
        <div className="hero-buttons">
          <button className="hero-button" onClick={() => navigate('/city')}>Enter Site</button>
        </div>
      </div>
    </section>
  );
}

