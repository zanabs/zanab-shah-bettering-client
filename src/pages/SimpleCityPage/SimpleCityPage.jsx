import {  Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "redaxios";
import { MapCard } from "../../components/MapCard/MapCard";

export const SimpleCityPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [resources, setResources] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getResources = async () => {
      try {
        const response = await axios.get(`${apiUrl}/resources`);
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching data from the server:', error);
      }
    };

    getResources();
  }, []);

  return (
    <div className="city-landing-page">
      
      <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>

        
        <Box sx={{ width: '75%', padding: '20px', backgroundColor: '#f0f0f0'}}>
        <MapCard resources={resources} />

         
        </Box>
      </Box>
    </div>
  );
};
