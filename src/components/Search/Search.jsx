import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export const Search = ({ onSearch, value }) => {
  const handleInputChange = (event) => {
    const searchValue = event.target.value;  // Get the input value
    onSearch(searchValue);  // Pass the input value to the parent component
  };

  return (
    <Stack>
      <TextField
        id="search-input"
        label="Search"
        variant="outlined"
        value={value} // Controlled input value
        onChange={handleInputChange} // Trigger filtering on each input change
        fullWidth
      />
    </Stack>
  );
};