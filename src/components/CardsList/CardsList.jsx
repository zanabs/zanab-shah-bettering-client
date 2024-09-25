import { Box } from '@mui/material';
import { ListCard } from "../ListCard/ListCard";
import { useLocation } from 'react-router-dom';

export const CardsList = ({ cardsItems = [] }) => {
  const location = useLocation(); // To check the current route

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="space-between"
      gap={2}
      sx={{
        padding: '10px',
      }}
    >
      {cardsItems.length > 0 ? (
        cardsItems.map((cardItem, index) => (
          <ListCard
            cardItem={cardItem}
            key={`card-${index}`}
            showReferButton={location.pathname.startsWith('/refer-patient')} // Pass route check to ListCard
            sx={{ width: '300px', flexGrow: 1 }}
          />
        ))
      ) : (
        <p>No resources found</p>
      )}
    </Box>
  );
};
