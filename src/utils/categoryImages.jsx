import FoodIcon from '@mui/icons-material/Restaurant';
import MentalHealthIcon from '@mui/icons-material/Psychology';
import GBVIcon from '@mui/icons-material/ReportProblem';
import GardenIcon from '@mui/icons-material/Nature';
import DentistryIcon from '@mui/icons-material/HealthAndSafety';
import ShelterIcon from '@mui/icons-material/Home';
import CulturalSupportIcon from '@mui/icons-material/Groups';

export const getCategoryImages = () => {
  const resourceImageMap = {
    'food': <FoodIcon sx={{color: 'brown'}} />,
    'mental-health': <MentalHealthIcon sx={{color: 'blue'}}  />,
    'gbv': <GBVIcon sx={{color: 'pink'}}  />,
    'gardens': <GardenIcon sx={{color: 'green'}} />,
    'dentistry': <DentistryIcon sx={{color: 'purple'}}  />,
    'shelter': <ShelterIcon sx={{color: 'orange'}}  />,
    'cultural-support': <CulturalSupportIcon sx={{color: 'red'}} />,
  }

  return resourceImageMap;
}