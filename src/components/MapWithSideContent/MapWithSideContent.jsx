import { Box } from "@mui/material"
import { MapCard } from "../MapCard/MapCard"
import './MapWithSideContent.scss';
import FoodIcon from '@mui/icons-material/Restaurant';
import MentalHealthIcon from '@mui/icons-material/Psychology';
import GBVIcon from '@mui/icons-material/ReportProblem';
import GardenIcon from '@mui/icons-material/Nature';
import DentistryIcon from '@mui/icons-material/HealthAndSafety';
import ShelterIcon from '@mui/icons-material/Home';
import CulturalSupportIcon from '@mui/icons-material/Groups';

const iconMapping = {
    "food": <FoodIcon sx={{ color: 'brown' }} />,
    "mental_health": <MentalHealthIcon sx={{ color: 'blue' }} />,
    "gender_based_violence": <GBVIcon sx={{ color: 'pink' }} />,
    "community_garden": <GardenIcon sx={{ color: 'green' }} />,
    "dentistry": <DentistryIcon sx={{ color: 'purple' }} />,
    "shelter": <ShelterIcon sx={{ color: 'orange' }} />,
    "cultural_support": <CulturalSupportIcon sx={{ color: 'red' }} />
  };

export const MapWithSideContent = ({resources, children, showSideContent}) => {
    return (
        <section className="map-with-side-content">
            <Box className="map-with-side-content__map">
                <MapCard resources={resources} iconMapping={iconMapping} />
            </Box>
            {showSideContent && 
                <Box className="map-with-side-content__content" sx={{paddingLeft: 3, paddingRight: 3, paddingTop: 3, boxSizing: "border-box"}}>
                    {children}
                </Box>
            }
        </section>
    )
}