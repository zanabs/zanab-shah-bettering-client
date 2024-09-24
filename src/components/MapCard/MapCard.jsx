import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";
import FoodIcon from '@mui/icons-material/Restaurant';
import MentalHealthIcon from '@mui/icons-material/Psychology';
import GBVIcon from '@mui/icons-material/ReportProblem';
import GardenIcon from '@mui/icons-material/Nature';
import DentistryIcon from '@mui/icons-material/HealthAndSafety';
import ShelterIcon from '@mui/icons-material/Home';
import CulturalSupportIcon from '@mui/icons-material/Groups';
import { MarkerWithInfoWindow } from "../MarkerWithInfoWindow/MarkerWithInfoWindow";

const resourceImageMap = {
  'food': <FoodIcon sx={{color: 'brown'}} />,
  'mental-health': <MentalHealthIcon sx={{color: 'blue'}}  />,
  'gbv': <GBVIcon sx={{color: 'pink'}}  />,
  'gardens': <GardenIcon sx={{color: 'green'}} />,
  'dentistry': <DentistryIcon sx={{color: 'purple'}}  />,
  'shelter': <ShelterIcon sx={{color: 'orange'}}  />,
  'cultural-support': <CulturalSupportIcon sx={{color: 'red'}} />,
}

export const MapCard = ({ resources }) => {
  const api_Key = import.meta.env.VITE_MAPS_API_KEY;
  const map_Id = import.meta.env.VITE_MAP_ID;
  const [userLocation, setUserLocation] = useState(null);
 
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting the user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const handleGetDirectionsClick = (resource) => {
    console.log('clicked');
    if (!userLocation) {
      alert("Unable to get your location.");
      return;
    }

    const destinationLat = resource.geometry.coordinates[1];
    const destinationLng = resource.geometry.coordinates[0];
    const mapsURL = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${destinationLat},${destinationLng}&travelmode=driving`;
    console.log('clicked 2');
    
    window.open(mapsURL, "_blank");
  };

  return (
    <APIProvider apiKey={api_Key}>
      <Map
        mapId={map_Id}
        style={{ width: '100%', height: '100%' }}
        defaultCenter={{ lat: 49.28594, lng: -123.11129 }}  // Waterfront Station, Vancouver
        defaultZoom={12}  
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        {resources.map((resource) => (
          <MarkerWithInfoWindow
            resource={resource}
            position={{
              lng: resource.geometry.coordinates[0],
              lat: resource.geometry.coordinates[1],
            }}
            pinImage={resourceImageMap[resource.properties.type]}
            key={`${resource.properties.type}-${resource.id | resource.properties.id}`} 
            onGetDirectionsClick={() => handleGetDirectionsClick(resource)}
          />
        ))}
      </Map>
    </APIProvider>
  );
};
