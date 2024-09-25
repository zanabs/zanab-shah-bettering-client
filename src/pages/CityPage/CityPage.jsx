import { Drawer, List, ListItem, ListItemText, Typography, Button, ListItemIcon, Box } from "@mui/material";
import FoodIcon from '@mui/icons-material/Restaurant';
import MentalHealthIcon from '@mui/icons-material/Psychology';
import GBVIcon from '@mui/icons-material/ReportProblem';
import GardenIcon from '@mui/icons-material/Nature';
import DentistryIcon from '@mui/icons-material/HealthAndSafety';
import ShelterIcon from '@mui/icons-material/Home';
import CulturalSupportIcon from '@mui/icons-material/Groups';
import { useEffect, useState } from "react";
import axios from "redaxios";
import { CategoryCardsList } from "../../components/CategoryCardsList/CategoryCardsList";
import { MapWithSideContent } from "../../components/MapWithSideContent/MapWithSideContent";

export const CityPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [resources, setResources] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(true);
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const handleViewAllCategories = () => {
    setOpenDrawer(false);
    setShowCards(true);
  };

  return (
    <div className="city-landing-page">
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

      <MapWithSideContent resources={resources} showSideContent={showCards}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h4" component="h1">
            Social Prescription Platform
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Categories
          </Typography>
        </Box>
        <CategoryCardsList resources={resources} />
      </MapWithSideContent>
    </div>
  )
}