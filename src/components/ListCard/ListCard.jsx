import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Avatar } from '@mui/material'; 

export const ListCard = ({ cardItem }) => {
  const navigate = useNavigate();
  const handleClick = (categoryId, resourceId) => navigate(`/resource/${categoryId}/${resourceId}`);

  const [resource, setResource] = useState({
    name: '',
    description: '',
    type: '',
    id: '',
  });

  useEffect(() => {
    if (cardItem.properties.type === 'shelter') {
      setResource({
        id: cardItem.id,
        name: cardItem.properties.program_name,
        description: cardItem.properties.category,
        type: cardItem.properties.type,
      });
    }

    if (cardItem.properties.type === 'food') {
      setResource({
        id: cardItem.id,
        name: cardItem.properties.program_name,
        description: cardItem.properties.description,
        type: cardItem.properties.type,
      });
    }

    if (cardItem.properties.type === 'gardens') {
      setResource({
        id: cardItem.id,
        name: cardItem.properties.program_name,
        description: cardItem.properties.description,
        type: cardItem.properties.type,
      });
    }

    if (cardItem.properties.type === 'cultural-support') {
      setResource({
        id: cardItem.id,
        name: cardItem.properties.program_name,
        description: cardItem.properties.description,
        type: cardItem.properties.type,
      });
    }

    if (cardItem.properties.type === 'mental-health') {
      setResource({
        id: cardItem.id,
        name: cardItem.properties.program_name,
        description: cardItem.properties.description,
        type: cardItem.properties.type,
      })
    }

    if (cardItem.properties.type === 'dentistry') {
      setResource({
        id: cardItem.id,
        name: cardItem.properties.program_name,
        description: cardItem.properties.description, 
        type: cardItem.properties.type,
      })
    }

    if (cardItem.properties.type==='gbv') {
      setResource({
        id: cardItem.id,
        name: cardItem.properties.program_name,
        description: cardItem.properties.description,
        type: cardItem.properties.type,
      })
    }


  }, [cardItem]);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        p: 2,
        bgcolor: 'background.default',
        borderRadius: 2,
        border: 1,
        borderColor: 'divider',
        cursor: 'pointer',
        minHeight: '200px',
      }}
      onClick={() => handleClick(resource.type, resource.id)}
    >
      <CardActionArea>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', width: '100%' }}>
          
          <Avatar
            src="/static/images/default-placeholder.png" 
            sx={{ width: 56, height: 56, borderRadius: '50%' }}
            alt={resource.name || 'Placeholder'}
          />
          
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="body1" fontWeight="bold" color="textPrimary">
              {resource.name || 'Default Title'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {resource.description || 'Default description goes here.'}
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};
