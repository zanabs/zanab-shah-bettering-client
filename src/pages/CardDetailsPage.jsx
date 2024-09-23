import { MapCard } from "../components/MapCard/MapCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Chip, Stack, Box, Typography, Card, CardContent, Avatar, Grid } from "@mui/material";

export const CardDetailsPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { resourceId, categoryId } = useParams();
  const [resource, setResource] = useState(undefined);

  useEffect(() => {
    const getResource = async () => {
      try {
        const response = await axios.get(`${apiUrl}/resources/${categoryId}/${resourceId}`);
        console.log("Server response:", response.data);
        setResource(response.data);
      } catch (error) {
        console.error("Error fetching data from the server:", error);
      }
    };

    getResource();
  }, [resourceId, categoryId]);

  const getTags = () => {
    const tags = [];
    const properties = resource?.properties;


    if (properties?.halal_food_offered) {
      tags.push({ label: "Halal", color: "#FF8C00" });
    }
    if (properties?.vegan_options) {
      tags.push({ label: "Vegan Options", color: "#006400" });
    }
    if (properties?.gluten_free_options) {
      tags.push({ label: "Gluten-Free Options", color: "#8B4513" });
    }
    if (properties?.absolutely_free) {
      tags.push({ label: "No-Cost to User", color: "#2E8B57" });
    }
    if (properties?.kosher_food_offered) {
      tags.push({ label: "Kosher-Certified", color: "#B8860B" });
    }

    if (properties?.serves_all_genders) {
      tags.push({ label: "Serves all genders", color: "#006400" });
    }

    if (properties?.men_only) {
      tags.push({ label: "Men's services only", color: "#FF8C00" });
    }

    if (properties?.women_only) {
      tags.push({ label: "Women's services only", color: "#8B4513" });
    }

    if (properties?.food_available) {
      tags.push({ label: "Serves food", color: "#B8860B" });
    }

    if (properties?.sliding_scale) {
      tags.push({ label: "Serves food", color: "#B8860B" });
    }

    if (properties?.families_welcome) {
      tags.push({ label: "Sliding-scale", color: "#2E8B57" });
    }

    if (properties?.public) {
      tags.push({ label: "Public", color: "#6B4513" });
    } else if (properties?.private) {
      tags.push({ label: "Private", color: "#8B4513" });
    }

    if (properties?.translation_services_available) {
      tags.push({ label: "Translation services available", color: "#6B4519" })
    }
    return tags;
  };

  return (
    <>
      {resource && (
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.default",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              m: 0,
              p: 0,
            }}
          >

            <Grid item xs={12} md={4}>
              <Box sx={{ width: "100%" }}>
                <MapCard resources={[resource]} style={{ width: "100%" }} />
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  width: "100%",
                  p: 2,
                  bgcolor: "background.default",
                  borderRadius: 2,
                  border: 1,
                  borderColor: "divider",
                }}
              >
                <CardContent sx={{ width: "100%" }}>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Avatar
                      sx={{ width: 56, height: 56, borderRadius: "50%", bgcolor: "grey.200" }}
                      alt={resource.properties.program_name || "Placeholder"}
                    />
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                      <Typography variant="h5" fontWeight="bold">
                        {resource.properties.program_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {resource.properties.description || "No description available"}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  gap: 2,
                }}
              >
                <Typography variant="h6" component="div" fontWeight="bold" gutterBottom>
                  Selected Location Features
                </Typography>
                <Stack spacing={1}>
                  {getTags().map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag.label}
                      sx={{ bgcolor: tag.color, color: "#fff", fontWeight: "bold" }} // Dark background and white text
                    />
                  ))}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};
