import { Search } from "../components/Search/Search";
import { CardsList } from "../components/CardsList/CardsList";
import { MapCard } from "../components/MapCard/MapCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Chip, Switch, FormControlLabel, Box, Grid } from "@mui/material";
import FoodIcon from '@mui/icons-material/Restaurant';
import MentalHealthIcon from '@mui/icons-material/Psychology';
import GBVIcon from '@mui/icons-material/ReportProblem';
import GardenIcon from '@mui/icons-material/Nature';
import DentistryIcon from '@mui/icons-material/HealthAndSafety';
import ShelterIcon from '@mui/icons-material/Home';
import CulturalSupportIcon from '@mui/icons-material/Groups';

export const CategoryPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { categoryId } = useParams();
  const [resources, setResources] = useState([]);
  const [openNowResources, setOpenNowResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchWithTags, setSearchWithTags] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);


  const iconMapping = {
    "food": <FoodIcon sx={{ color: 'brown' }} />,
    "mental_health": <MentalHealthIcon sx={{ color: 'blue' }} />,
    "gender_based_violence": <GBVIcon sx={{ color: 'pink' }} />,
    "community_garden": <GardenIcon sx={{ color: 'green' }} />,
    "dentistry": <DentistryIcon sx={{ color: 'purple' }} />,
    "shelter": <ShelterIcon sx={{ color: 'orange' }} />,
    "cultural_support": <CulturalSupportIcon sx={{ color: 'red' }} />
  };

  useEffect(() => {
    const getResources = async () => {
      try {
        const response = await axios.get(`${apiUrl}/resources?categoryId=${categoryId}`);
        const categoryFilteredResources = response.data.filter(resource => resource.properties.type === categoryId);

        setResources(categoryFilteredResources);
        filterOpenNowResources(categoryFilteredResources);
      } catch (error) {
        console.error('Error fetching data from the server:', error);
      }
    };

    getResources();
  }, [categoryId]);

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue.toLowerCase());

    let filtered = resources.filter((resource) =>
      resource.properties.program_name.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (searchWithTags && selectedTags.length > 0) {
      filtered = filtered.filter(resource => selectedTags.every(tag => checkTag(resource, tag)));
    }

    filterOpenNowResources(filtered);
  };

  const filterOpenNowResources = (resources) => {
    const now = new Date();
    const currentDay = now.toLocaleString('en-US', { weekday: 'long' });
    const currentTime = now.getHours() + now.getMinutes() / 60;

    const openResources = resources.filter(resource => {
      const openingHours = resource.properties.opening_hours;
      if (!openingHours) return false;

      const [daysRange, hoursRange] = openingHours.split(": ");
      const [openTime, closeTime] = hoursRange.split(" - ").map(parseTime);

      const [startDay, endDay] = daysRange.split("-");
      if (!isTodayWithinDaysRange(currentDay, startDay, endDay)) return false;

      return currentTime >= openTime && currentTime <= closeTime;
    });

    setOpenNowResources(openResources);
    updateFilteredResources(resources, openResources);
  };

  const updateFilteredResources = (allResources, openResources) => {
    const openResourceIds = openResources.map(resource => resource.id);
    const filtered = allResources.filter(resource => !openResourceIds.includes(resource.id));
    setFilteredResources(filtered);
  };

  const parseTime = (timeString) => {
    const [time, period] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (isNaN(minutes)) minutes = 0;
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return hours + minutes / 60;
  };

  const isTodayWithinDaysRange = (currentDay, startDay, endDay) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDayIndex = daysOfWeek.indexOf(currentDay);
    const startDayIndex = daysOfWeek.indexOf(startDay);
    const endDayIndex = daysOfWeek.indexOf(endDay);
    if (startDayIndex <= endDayIndex) {
      return currentDayIndex >= startDayIndex && currentDayIndex <= endDayIndex;
    } else {
      return currentDayIndex >= startDayIndex || currentDayIndex <= endDayIndex;
    }
  };

  const checkTag = (resource, tag) => {
    if (categoryId === "food") {
      switch (tag) {
        case 'halal':
          return resource.properties.halal_food_offered;
        case 'vegan':
          return resource.properties.vegan_options;
        case 'gluten-free':
          return resource.properties.gluten_free_options;
        case 'kosher':
          return resource.properties.kosher_food_offered;
        case 'free':
          return resource.properties.absolutely_free;
        default:
          return false;
      }
    } else if (categoryId === "shelter") {
      switch (tag) {
        case 'all-genders':
          return resource.properties.serves_all_genders;
        case 'men-only':
          return resource.properties.men_only;
        case 'women-only':
          return resource.properties.women_only;
        case 'food':
          return resource.properties.food_available;
        case 'families':
          return resource.properties.families_welcome;
        case 'free':
          return resource.properties.absolutely_free;
        default:
          return false;
      }
    } else if (categoryId === "gardens") {
      switch (tag) {
        case 'public':
          return resource.properties.public;
        case 'private':
          return resource.properties.private;
        case 'free':
          return resource.properties.absolutely_free;
        default:
          return false;
      }
    } else if (categoryId === "mental-health") {
      switch (tag) {
        case 'sliding_scale':
          return resource.properties.sliding_scale;
        case 'free':
          return resource.properties.absolutely_free;
        default:
          return false;
      }
    } else if (categoryId === "dentistry") {
      switch (tag) {
        case 'sliding_scale':
          return resource.properties.sliding_scale;
        case 'free':
          return resource.properties.absolutely_free;
        default:
          return false;
      }
    } else if (categoryId === "gbv") {
      switch (tag) {
        case 'sliding_scale':
          return resource.properties.sliding_scale;
        case 'translation_services_available':
          return resource.properties.translation_services_available;
        case 'free':
          return resource.properties.absolutely_free;
        default:
          return false;
      }
    }
  };

  const handleTagToggle = (tag) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newSelectedTags);

    let filtered = newSelectedTags.length === 0
      ? resources
      : resources.filter(resource => newSelectedTags.every(tag => checkTag(resource, tag)));

    filterOpenNowResources(filtered);
  };

  const handleToggleChange = (e) => {
    setSearchWithTags(e.target.checked);

    if (!e.target.checked) {
      setSelectedTags([]);
      setFilteredResources(resources);
      filterOpenNowResources(resources);
    }
  };

  return (
    <Box display="flex" height="100vh">

      <Box flex="1" sx={{ height: '100%' }}>
        <MapCard resources={resources} iconMapping={iconMapping} />
      </Box>


      <Box flex="1" sx={{ height: '100%', overflowY: 'auto' }}>
        <Box display="flex" alignItems="center" gap={2} style={{ width: '100%' }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={8}>
              <Search onSearch={handleSearch} value={searchTerm} fullWidth />
            </Grid>
            <Grid item xs={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={searchWithTags}
                    onChange={handleToggleChange}
                    color="primary"
                  />
                }
                label="Search with Tags"
              />
            </Grid>
          </Grid>
        </Box>

        {searchWithTags && (
          <Box>

            {categoryId === "food" && (
              <>
                <Chip
                  label="Halal"
                  sx={{ bgcolor: selectedTags.includes('halal') ? "#FF8C00" : "black", color: "#fff" }}
                  onClick={() => handleTagToggle('halal')}
                />
                <Chip
                  label="Vegan"
                  sx={{ bgcolor: selectedTags.includes('vegan') ? "#006400" : "black", color: "#fff" }}
                  onClick={() => handleTagToggle('vegan')}
                />
                <Chip
                  label="Gluten-Free"
                  sx={{ bgcolor: selectedTags.includes('gluten-free') ? "#8B4513" : "black", color: "#fff" }}
                  onClick={() => handleTagToggle('gluten-free')}
                />
                <Chip
                  label="Kosher"
                  sx={{ bgcolor: selectedTags.includes('kosher') ? "#B8860B" : "black", color: "#fff" }}
                  onClick={() => handleTagToggle('kosher')}
                />
                <Chip
                  label="No-Cost"
                  sx={{ bgcolor: selectedTags.includes('free') ? "#2E8B57" : "black", color: "#fff" }}
                  onClick={() => handleTagToggle('free')}
                />
              </>
            )}


          </Box>
        )}

        <Box display="flex" gap="20px" style={{ marginTop: '20px' }}>
          <Box width="50%">
            <h2>{selectedTags.length === 0 && !searchTerm ? 'All Resources' : 'Selected Locations'}</h2>
            <CardsList cardsItems={filteredResources} />
          </Box>
          <Box width="50%" borderLeft="2px solid black" paddingLeft="10px">
            <h2>Open Now</h2>
            <CardsList cardsItems={openNowResources} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
