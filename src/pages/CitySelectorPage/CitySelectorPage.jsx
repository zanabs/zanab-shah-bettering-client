import { Link } from 'react-router-dom';
import './CitySelectorPage.scss';

export const CitySelectorPage = () => {

  return (
    <section className="gallery-section page-content">
      <h2 className="gallery-heading">Select City</h2>
      <div className="gallery-grid">

        <div className="city-card">
          <img src="../src/assets/Vancouver.png" alt="Vancouver" className="city-image" />
          <Link to="vancouver">
            <button className="city-button">Vancouver</button>
          </Link>
        </div>

        <div className="city-card">
          <img src="../src/assets/Toronto.png" alt="Toronto" className="city-image" />
          <Link to="#">
            <button className="city-button" disabled>Toronto</button>
          </Link>
        </div>

        <div className="city-card">
          <img src="../src/assets/New-York-City.png" alt="New York City" className="city-image" />
          <Link to="#">
            <button className="city-button" disabled>New York City</button>
          </Link>
        </div>
      </div>
    </section>
  );
}