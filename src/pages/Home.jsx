import { MapCard } from '../components/MapCard/MapCard';
import { CategoryCardsList } from '../components/CategoryCardsList/CategoryCardsList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as ScrollLink } from 'react-scroll';
import './Home.scss';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Typography, Button, Box } from "@mui/material";
import FoodIcon from '@mui/icons-material/Restaurant';
import MentalHealthIcon from '@mui/icons-material/Psychology';
import GBVIcon from '@mui/icons-material/ReportProblem';
import GardenIcon from '@mui/icons-material/Nature';
import DentistryIcon from '@mui/icons-material/HealthAndSafety';
import ShelterIcon from '@mui/icons-material/Home';
import CulturalSupportIcon from '@mui/icons-material/Groups';

function Home() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [resources, setResources] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [footerVisible, setFooterVisible] = useState(true);
  const [heroVisible, setHeroVisible] = useState(true);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const getResources = async () => {
      try {
        const response = await axios.get(`${apiUrl}/resources`);
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching data from the server:', error);
      }

    };

    getResources();
  }, []);

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setOpenDrawer(false);
    setShowMap(false);
    setShowCards(false);
    setHeroVisible(true);
    setFooterVisible(true);
  }, []);

  const handleCityClick = () => {
    setOpenDrawer(true);
    setShowMap(true);
    setFooterVisible(false);
  };

  const handleEnterSite = () => {
    setHeroVisible(false);
    setFooterVisible(false);
  };

  const handleViewAllCategories = () => {
    setOpenDrawer(false);
    setShowCards(true);
    setFooterVisible(false);
  };

  return (
    <>
      {heroVisible && (
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
              <button className="hero-button">Learn more about social prescription</button>


              <ScrollLink to="city-gallery" smooth={true} duration={500}>
                <button className="hero-button" onClick={handleEnterSite}>Enter Site</button>
              </ScrollLink>
            </div>
          </div>
        </section>
      )}

      {!showMap && !heroVisible && (
        <section id="city-gallery" className="gallery-section">
          <h2 className="gallery-heading">Select City</h2>
          <div className="gallery-grid">

            <div className="city-card">
              <img src="../src/assets/Vancouver.png" alt="Vancouver" className="city-image" />
              <ScrollLink to="main-content" smooth={true} duration={500}>
                <button className="city-button" onClick={handleCityClick}>Vancouver</button>
              </ScrollLink>
            </div>

            <div className="city-card">
              <img src="../src/assets/Toronto.png" alt="Toronto" className="city-image" />
              <ScrollLink to="main-content" smooth={true} duration={500}>
                <button className="city-button" onClick={handleCityClick}>Toronto</button>
              </ScrollLink>
            </div>

            <div className="city-card">
              <img src="../src/assets/New-York-City.png" alt="New York City" className="city-image" />
              <ScrollLink to="main-content" smooth={true} duration={500}>
                <button className="city-button" onClick={handleCityClick}>New York City</button>
              </ScrollLink>
            </div>
          </div>
        </section>
      )}

      {showMap && (
        <Drawer
          anchor="left"
          open={openDrawer}
          PaperProps={{
            sx: { width: '25vw', padding: '20px', backgroundColor: 'white' },
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: '20px' }}>Legend</Typography>
          <List>
            <ListItem>
              <ListItemIcon><FoodIcon sx={{ color: 'brown' }} /></ListItemIcon>
              <ListItemText primary="Food & Nutrition" />
            </ListItem>
            <ListItem>
              <ListItemIcon><MentalHealthIcon sx={{ color: 'blue' }} /></ListItemIcon>
              <ListItemText primary="Mental Health & Wellbeing" />
            </ListItem>
            <ListItem>
              <ListItemIcon><GBVIcon sx={{ color: 'pink' }} /></ListItemIcon>
              <ListItemText primary="Gender-based Violence Support" />
            </ListItem>
            <ListItem>
              <ListItemIcon><GardenIcon sx={{ color: 'green' }} /></ListItemIcon>
              <ListItemText primary="Community Gardens & Food Trees" />
            </ListItem>
            <ListItem>
              <ListItemIcon><DentistryIcon sx={{ color: 'purple' }} /></ListItemIcon>
              <ListItemText primary="Low-cost Dentistry" />
            </ListItem>
            <ListItem>
              <ListItemIcon><ShelterIcon sx={{ color: 'orange' }} /></ListItemIcon>
              <ListItemText primary="Shelter & Housing" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CulturalSupportIcon sx={{ color: 'red' }} /></ListItemIcon>
              <ListItemText primary="Cultural Support Networks" />
            </ListItem>
          </List>

          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: '20px', width: '100%' }}
            onClick={handleViewAllCategories}
          >
            View all categories
          </Button>
        </Drawer>
      )}

      {showMap && (
        <section id="main-content" style={{ display: 'flex', height: '100vh' }}>
          <Box flex={showCards ? "1" : "1.5"} sx={{ height: '100%' }}>
            <MapCard resources={resources} />
          </Box>

          {showCards && (
            <Box flex="1" sx={{ height: '100%', overflowY: 'auto' }}>
              <CategoryCardsList />
            </Box>
          )}
        </section>
      )}

      {footerVisible && (
        <footer className="footer">

        </footer>
      )}
    </>
  );
}

export default Home;
