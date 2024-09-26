import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "redaxios";
import { MapWithSideContent } from "../../components/MapWithSideContent/MapWithSideContent";
import { ResourcesList } from "../../components/ResourcesList/ResourcesList";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Checkbox, FormControlLabel } from "@mui/material";

export const SimpleCategoryPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { categoryId, cityName } = useParams();
  const location = useLocation(); // For checking the route
  const [resources, setResources] = useState([]);
  const [name, setName] = useState('');

  const [open, setOpen] = useState(false); // State to handle modal open/close
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    phone: '',
    noPhone: false,
    slidingScale: false,
    concern: '',
  });

  useEffect(() => {
    const selectedPatient = localStorage.getItem('selectedPatient');
    console.log(JSON.parse(selectedPatient).name);
    if (selectedPatient) {
      setPatientInfo({
        name: JSON.parse(selectedPatient).name
      }); 
    }
  }, []);

  useEffect(() => {
    console.log(patientInfo)
  }, [patientInfo]);

  useEffect(() => {
    const getResources = async () => {
      try {
        const response = await axios.get(`${apiUrl}/resources?categoryId=${categoryId}`);
        const categoryFilteredResources = response.data.filter(resource => resource.properties.type === categoryId);
        setResources(categoryFilteredResources);
      } catch (error) {
        console.error('Error fetching data from the server:', error);
      }
    };
    getResources();
  }, [categoryId]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle form inputs
  const handleInputChange = (event) => {
    console.log('kg')
    const { name, value, checked, type } = event.target;
    setPatientInfo({
      name: '[houx'
    })
    // setPatientInfo({
    //   ...patientInfo,
    //   [name]: type === "checkbox" ? checked : value,
    // });
  };

  return (
    <MapWithSideContent resources={resources} showSideContent={true}>
      <ResourcesList
        resources={resources}
        categoryId={categoryId}
        cityName={cityName}
        renderButton={location.pathname.startsWith('/refer-patient')}
        onReferClick={handleOpen} // Pass down the function to open the modal
      />

      {/* Modal for referring a patient */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Refer Patient</DialogTitle>
        <DialogContent>
        <TextField
            value={name}
            onChange={() => setName('newe name')}
          />
          {patientInfo.name}
          <TextField
            autoFocus
            margin="dense"
            label="Patient Name"
            name="name"
            fullWidth
            value={patientInfo.name}
            onChange={() => handleInputChange()}
          />
          <TextField
            margin="dense"
            label="Patient Phone Number"
            name="phone"
            fullWidth
            value={patientInfo.phone}
            onChange={handleInputChange}
            disabled={patientInfo.noPhone}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="noPhone"
                checked={patientInfo.noPhone}
                onChange={handleInputChange}
              />
            }
            label="Patient does not have a phone number"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="slidingScale"
                checked={patientInfo.slidingScale}
                onChange={handleInputChange}
              />
            }
            label="Is the patient in need of free or sliding scale services?"
          />
          <TextField
            margin="dense"
            label="Patient Concern"
            name="concern"
            fullWidth
            multiline
            rows={10}
            value={patientInfo.concern}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => { /* Handle the referral submission */ }}>Make Referral</Button>
        </DialogActions>
      </Dialog>
    </MapWithSideContent>
  );
};
