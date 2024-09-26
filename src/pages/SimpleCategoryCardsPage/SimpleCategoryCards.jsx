import { useEffect, useState } from 'react';
import { Box, Typography, Card, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import axios from "redaxios";
import { useNavigate } from 'react-router-dom';

export const SimpleCategoryCards = ({onSelectCategory}) => {
  const [categories, setCategories] = useState([]);
  const [resources, setResources] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const getResources = async () => {
      try {
        const response = await axios.get(`${apiUrl}/resources`);
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    getCategories();
    getResources();
  }, []);

  const handleCategoryClick = (categoryId) => {
    onSelectCategory(categoryId);
    // Navigate to the category page when the card or button is clicked
    // navigate(`/refer-patient/${categoryId}`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, bgcolor: 'background.default', minHeight: '90vh', overflow: 'hidden' }}>
      {resources.length > 0 && (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={6} key={category.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                <CategoryCard
                  category={category}
                  resources={resources}
                  onClick={() => handleCategoryClick(category.id)} // Pass the categoryId to navigate
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

const CategoryCard = ({ category, onClick, resources }) => {
  const [displayedLocations, setDisplayedLocations] = useState(0);

  useEffect(() => {
    const target = resources.filter(resource => resource.properties.type === category.id).length;
    setDisplayedLocations(target);
  }, [resources, category.id]);

  return (
    <Card
      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2, bgcolor: 'background.default', borderRadius: 2, border: 1, borderColor: 'divider', cursor: 'pointer' }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Typography variant="body1" fontWeight="bold" color="textPrimary">
          {category.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {category.description}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 150, height: 40, borderRadius: '5%', bgcolor: 'blue', color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: '0.8rem' }}>
          <p>{displayedLocations}&nbsp;Resources found</p>
        </Box>
      </Box>
      {/* Button to navigate to the category page */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button variant="contained" color="primary" onClick={onClick}>
          View {category.name}
        </Button>
      </Box>
    </Card>
  );
};
