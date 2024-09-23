import { Box, Typography, Grid, Card, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CategoryCardsList = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data from the server:", error);
      }
    };

    getCategories();
  }, []);

  const handleClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 3,
        bgcolor: "background.default",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h4" component="h1">
          Social Prescription Platform
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Categories
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id} sx={{ display: 'flex', justifyContent: 'center' }}>
            <CategoryCard category={category} onClick={() => handleClick(category.id)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const CategoryCard = ({ category, onClick }) => {
  const [displayedLocations, setDisplayedLocations] = useState(1);

  useEffect(() => {
    let current = 1;
    const incrementSpeed = 50;
    const target = category.number_of_locations;

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
  }, [category.number_of_locations]);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        bgcolor: "background.default",
        borderRadius: 2,
        border: 1,
        borderColor: "divider",
        cursor: "pointer",
      }}
      onClick={onClick}
    >

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
        <Avatar
          src={category.image || "/static/images/default-placeholder.png"}
          sx={{ width: 64, height: 64, borderRadius: "50%" }}
          alt={category.name}
        />
        <Typography variant="body1" fontWeight="bold" color="textPrimary">
          {category.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {category.description}
        </Typography>
      </Box>


      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 150,
            height: 40,
            borderRadius: "5%",
            bgcolor: "blue",
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "0.8rem",
          }}
        >
          <p>
            {displayedLocations}&nbsp;Resources found
          </p>
        </Box>
      </Box>
    </Card>
  );
};
