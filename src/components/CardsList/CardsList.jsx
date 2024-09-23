import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ListCard } from "../ListCard/ListCard";

export const CardsList = ({ cardsItems = [] }) => {
  const navigate = useNavigate();

  const handleClick = () => navigate('/CardDetailsPage');

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
            onClick={handleClick}
            cardItem={cardItem}
            key={`card-${index}`}
            sx={{ width: '300px', flexGrow: 1 }} 
          />
        ))
      ) : (
        <p></p> 
      )}
    </Box>
  );
};