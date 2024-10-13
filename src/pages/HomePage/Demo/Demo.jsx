import { Box, CardActionArea, Typography } from '@mui/material';
import Card from '@mui/material/Card';

export const Demo = () => {
  return (
    <div>
    <Card>
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
        width: '100%'
      }}
    </Card>
      <CardActionArea>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', width: '100%' }}>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="body1" fontWeight="bold" color="textPrimary">
              {'Supporting newcomer patients'}
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </div>
  )
}