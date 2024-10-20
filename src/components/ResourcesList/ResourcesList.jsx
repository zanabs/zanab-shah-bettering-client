import { Box, Chip, FormControlLabel, Grid, Switch, Typography } from "@mui/material"
import { CardsList } from "../CardsList/CardsList"
import { Search } from "../Search/Search"
import { useEffect, useState } from "react";

export const ResourcesList = ({ resources, categoryId, cityName }) => {
  const [openNowResources, setOpenNowResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchWithTags, setSearchWithTags] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    filterOpenNowResources(resources);
    setFilteredResources(resources);
  }, [resources])


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
        case 'serves_all_genders':
          return resource.properties.serves_all_genders;
        case 'men_only':
          return resource.properties.men_only;
        case 'women_only':
          return resource.properties.women_only;
        case 'food_available':
          return resource.properties.food_available;
        case 'families_welcome':
          return resource.properties.families_welcome;
        case 'absolutely_free':
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
    return false;
  };

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
    <Box flex="1" sx={{ height: '100%', overflowY: 'auto' }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, paddingBottom: 1 }}>
        <Typography variant="h4" component="h1">
          {categoryId} resources | {cityName || 'vancouver'}
        </Typography>
      </Box>
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
        <Box sx={{ padding: '1em 0' }}>
          {categoryId === "food" && (
            <>
              <Chip
                label="Halal"
                sx={{ marginRight: "1em", marginBottom: "1em", bgcolor: selectedTags.includes('halal') ? "#FF8C00" : "black", color: "#fff" }}
                onClick={() => handleTagToggle('halal')}
              />
              <Chip
                label="Vegan"
                sx={{ marginRight: "1em", marginBottom: "1em", bgcolor: selectedTags.includes('vegan') ? "#006400" : "black", color: "#fff" }}
                onClick={() => handleTagToggle('vegan')}
              />
              <Chip
                label="Gluten-Free"
                sx={{ marginRight: "1em", marginBottom: "1em", bgcolor: selectedTags.includes('gluten-free') ? "#8B4513" : "black", color: "#fff" }}
                onClick={() => handleTagToggle('gluten-free')}
              />
              <Chip
                label="Kosher"
                sx={{ marginRight: "1em", marginBottom: "1em", bgcolor: selectedTags.includes('kosher') ? "#B8860B" : "black", color: "#fff" }}
                onClick={() => handleTagToggle('kosher')}
              />
              <Chip
                label="No-Cost"
                sx={{ marginRight: "1em", marginBottom: "1em", bgcolor: selectedTags.includes('free') ? "#2E8B57" : "black", color: "#fff" }}
                onClick={() => handleTagToggle('free')}
              />
            </>
          )}
          {categoryId === "shelter" && (
            <>
              <Chip
                label="Serves All Genders"
                sx={{ marginRight: "1em", marginBottom: "1em", bgcolor: selectedTags.includes('serves_all_genders') ? "#FF8C00" : "black", color: "#fff" }}
                onClick={() => handleTagToggle('serves_all_genders')}
              />
              <Chip
                label="Men Only"
                sx={{ marginRight: "1em", marginBottom: "1em", bgcolor: selectedTags.includes('men_only') ? "#006400" : "black", color: "#fff" }}
                onClick={() => handleTagToggle('men_only')}
              />
              <Chip
                label="Women Only"
                sx={{ marginRight: "1em", marginBottom: "1em", bgcolor: selectedTags.includes('women_only') ? "#8B4513" : "black", color: "#fff" }}
                onClick={() => handleTagToggle('women_only')}
              />
              <Chip
                label="Food Available"
                sx={{ marginRight: "1em", marginBottom: "1em", bgcolor: selectedTags.includes('food_available') ? "#B8860B" : "black", color: "#fff" }}
                onClick={() => handleTagToggle('food_available')}
              />
              <Chip
                label="Families Welcome"
                sx={{ marginRight: "1em", marginBottom: "1em", bgcolor: selectedTags.includes('families_welcome') ? "#2E8B57" : "black", color: "#fff" }}
                onClick={() => handleTagToggle('families_welcome')}
              />
              <Chip
                label="Absolutely Free"
                sx={{ marginRight: "1em", marginBottom: "1em", bgcolor: selectedTags.includes('absolutely_free') ? "#2E8B57" : "black", color: "#fff" }}
                onClick={() => handleTagToggle('absolutely_free')}
              />
            </>
          )}
          {categoryId === "gardens" && (
            <>
              <Chip
                label="Public"
                sx={{ marginRight: "1em", marginBottom: "1em", bgcolor: selectedTags.includes('public') ? "#FF8C00" : "black", color: "#fff" }}
                onClick={() => handleTagToggle('public')}
              />
              <Chip
                label="Private"
                sx={{ marginRight: "1em", marginBottom: "1em", bgcolor: selectedTags.includes('private') ? "#006400" : "black", color: "#fff" }}
                onClick={() => handleTagToggle('private')}
              />
              <Chip
                label="Free"
                sx={{ marginRight: "1em", marginBottom: "1em", bgcolor: selectedTags.includes('free') ? "#8B4513" : "black", color: "#fff" }}
                onClick={() => handleTagToggle('free')}
              />
            </>
          )}
          {categoryId === "mental-health" && (
            <>
              <Chip
                label="Sliding Scale"
                sx={{ marginRight: "1em", marginBottom: "1em", bgcolor: selectedTags.includes('sliding_scale') ? "#FF8C00" : "black", color: "#fff" }}
                onClick={() => handleTagToggle('sliding_scale')}
              />
              <Chip
                label="Free"
                sx={{ marginRight: "1em", marginBottom: "1em", bgcolor: selectedTags.includes('free') ? "#006400" : "black", color: "#fff" }}
                onClick={() => handleTagToggle('free')}
              />
            </>
          )}
          {categoryId === "dentistry" && (
            <>
              <Chip
                label="Sliding Scale"
                sx={{ marginRight: "1em", marginBottom: "1em", bgcolor: selectedTags.includes('sliding_scale') ? "#FF8C00" : "black", color: "#fff" }}
                onClick={() => handleTagToggle('sliding_scale')}
              />
              <Chip
                label="Free"
                sx={{ marginRight: "1em", marginBottom: "1em", bgcolor: selectedTags.includes('free') ? "#006400" : "black", color: "#fff" }}
                onClick={() => handleTagToggle('free')}
              />
            </>
          )}
          {categoryId === "gbv" && (
            <>
              <Chip
                label="Sliding Scale"
                sx={{ marginRight: "1em", marginBottom: "1em", bgcolor: selectedTags.includes('sliding_scale') ? "#FF8C00" : "black", color: "#fff" }}
                onClick={() => handleTagToggle('sliding_scale')}
              />
              <Chip
                label="Translation Services"
                sx={{ marginRight: "1em", marginBottom: "1em", bgcolor: selectedTags.includes('translation_services_available') ? "#006400" : "black", color: "#fff" }}
                onClick={() => handleTagToggle('translation_services_available')}
              />
              <Chip
                label="Free"
                sx={{ marginRight: "1em", marginBottom: "1em", bgcolor: selectedTags.includes('free') ? "#8B4513" : "black", color: "#fff" }}
                onClick={() => handleTagToggle('free')}
              />
            </>
          )}
        </Box>
      )}

      <Box display="flex" flexWrap={'wrap'} gap="20px" style={{ marginTop: '20px' }}>
        <Box sx={{ width: { sm: "100%", md: 'calc(50% - 20px)' } }} boxSizing={'border-box'}>
          <h2>{selectedTags.length === 0 && !searchTerm ? 'All Resources' : 'Selected Locations'}</h2>
          <CardsList cardsItems={filteredResources} />
        </Box>
        <Box sx={{ width: { sm: "100%", md: '50%' } }} boxSizing={'border-box'} borderLeft="2px solid black" paddingLeft="10px">
          <h2>Open Now</h2>
          <CardsList cardsItems={openNowResources} />
        </Box>
      </Box>
    </Box>)
}