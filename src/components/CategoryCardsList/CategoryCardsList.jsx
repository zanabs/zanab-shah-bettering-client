import { Box, Typography, Grid2 as Grid, Card } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "redaxios";
import { useNavigate } from "react-router-dom";
import { getCategoryImages } from "../../utils/categoryImages";

export const CategoryCardsList = ({ resources }) => {
  const [categories, setCategories] = useState([]);
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

    getCategories();
  }, []);

  const handleClick = (categoryId) => {
    navigate(`./category/${categoryId}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        bgcolor: 'background.default',
        minHeight: '90vh',
        overflow: 'hidden',
      }}
    >
      {resources && (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {categories.map((category) => (
              <Grid size={{xs: 12, sm: 6, md: 4}} key={category.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                <CategoryCard
                  resources={resources}
                  category={category}
                  onClick={() => handleClick(category.id)}
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
    let current = 0;
    const incrementSpeed = 50; // Speed of the count-up animation

    // Filter resources based on category
    const target = resources.filter(resource => resource.properties.type === category.id).length;

    // Increment the displayed locations count until it matches the target
    const interval = setInterval(() => {
      setDisplayedLocations((prev) => {
        if (prev < target) {
          current++;
          return current;
        } else {
          clearInterval(interval);
          return target;
        }
      });
    }, incrementSpeed);

    return () => clearInterval(interval);
  }, [resources, category.id]);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 2,
        bgcolor: 'background.default',
        borderRadius: 2,
        border: 1,
        borderColor: 'divider',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        {getCategoryImages()[category.id]}

        <Typography variant="body1" fontWeight="bold" color="textPrimary">
          {category.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {category.description}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 150,
            height: 40,
            borderRadius: '5%',
            bgcolor: 'blue',
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: '0.8rem',
          }}
        >
          <p>{displayedLocations}&nbsp;Resources found</p>
        </Box>
      </Box>
    </Card>
  );
};
