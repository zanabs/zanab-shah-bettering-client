
import { Box, Typography, Grid, Card, CardContent, Avatar } from "@mui/material";

const categories = [
  {
    title: "Food & nutrition",
    image: "/shape.png",
  },
  {
    title: "Mental wellbeing",
    image: "/image.png",
  },
  {
    title: "Financial support",
    image: "/shape-2.png",
  },
  {
    title: "Housing & shelter",
    image: "/shape-3.png",
  },
  {
    title: "Gender-based violence support",
    image: "/shape-4.png",
  },
  {
    title: "Services for newcomers",
    image: "/shape-5.png",
  },
];

const CardGrid = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 3,
        bgcolor: "background.default",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h4" component="h1">
          Social prescription platform
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Categories
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: 3,
                bgcolor: "background.default",
                borderRadius: 2,
                border: 1,
                borderColor: "divider",
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Typography variant="h6" component="h2">
                  {category.title}
                </Typography>
              </CardContent>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Avatar
                  src={category.image}
                  sx={{ width: 56, height: 56, borderRadius: "50%" }}
                />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                  <Typography variant="body1" fontWeight="bold" color="textSecondary">
                    Title
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Description
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardGrid;