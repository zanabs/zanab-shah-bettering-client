import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, TextField, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

export const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null); 
  const [newPatient, setNewPatient] = useState({
    name: '',
    dob: '',
    pronouns: '',
    address: '',
    phoneNumber: '',
    notes: '',
  });

  const navigate = useNavigate();


  useEffect(() => {
    const storedPatients = localStorage.getItem('patients');
    if (storedPatients) {
      setPatients(JSON.parse(storedPatients)); 
    }
  }, []);


  useEffect(() => {
    if (patients.length > 0) {
      localStorage.setItem('patients', JSON.stringify(patients)); 
    }
  }, [patients]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient({
      ...newPatient,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    setPatients((prevPatients) => {
      const updatedPatients = [newPatient, ...prevPatients];
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
      return updatedPatients;
    });

    setNewPatient({
      name: '',
      dob: '',
      pronouns: '',
      address: '',
      phoneNumber: '',
      notes: '',
    });
    
    setShowForm(false);
  };


  const handlePatientClick = (patient) => {
    setSelectedPatient(patient); 
    setShowForm(false);
  };


  const handleReferPatient = () => {
    if (selectedPatient) {
      localStorage.setItem('selectedPatient', JSON.stringify(selectedPatient)); 
      navigate('/refer-patient');
    }
  };

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100vh', flexDirection:'column' }}>
      <Box sx={{ width: '75%', padding: '20px' }}>
        {!showForm && !selectedPatient ? (
          patients.map((patient, index) => (
            <Card
              key={index}
              sx={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}
              onClick={() => handlePatientClick(patient)} 
            >
              <CardContent>
                <Typography variant="h6">{patient.name}</Typography>
              </CardContent>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation(); 
                  setPatients(patients.filter(p => p.name !== patient.name)); 
                  localStorage.setItem('patients', JSON.stringify(patients)); 
                }}
                sx={{ marginRight: '10px', alignSelf: 'center' }}
                aria-label="delete"
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Card>
          ))
        ) : showForm ? (
          <Box component="form" onSubmit={handleFormSubmit} sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              label="Patient Name"
              variant="outlined"
              required
              name="name"
              value={newPatient.name}
              onChange={handleInputChange}
              sx={{ marginBottom: '15px' }}
            />
            <TextField
              label="DOB"
              type="date"
              name="dob"
              value={newPatient.dob}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              sx={{ marginBottom: '15px' }}
            />
            <TextField
              label="Preferred Pronouns"
              variant="outlined"
              name="pronouns"
              value={newPatient.pronouns}
              onChange={handleInputChange}
              sx={{ marginBottom: '15px' }}
            />
            <TextField
              label="Address"
              variant="outlined"
              name="address"
              value={newPatient.address}
              onChange={handleInputChange}
              sx={{ marginBottom: '15px' }}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              name="phoneNumber"
              value={newPatient.phoneNumber}
              onChange={handleInputChange}
              sx={{ marginBottom: '15px' }}
            />
            <TextField
              label="Patient Notes"
              variant="outlined"
              multiline
              rows={10}
              name="notes"
              value={newPatient.notes}
              onChange={handleInputChange}
              sx={{ marginBottom: '15px' }}
            />
            <Button variant="contained" color="primary" type="submit">
              SUBMIT NEW PATIENT TO DATABASE
            </Button>
          </Box>
        ) : (
          selectedPatient && (
            <Box>
              <Typography variant="h5">{selectedPatient.name}</Typography>
              <Typography variant="body1">
                <strong>Date of Birth:</strong> {selectedPatient.dob || 'Data unknown'}
              </Typography>
              <Typography variant="body1">
                <strong>Preferred Pronouns:</strong> {selectedPatient.pronouns || 'Data unknown'}
              </Typography>
              <Typography variant="body1">
                <strong>Address:</strong> {selectedPatient.address || 'Data unknown'}
              </Typography>
              <Typography variant="body1">
                <strong>Phone Number:</strong> {selectedPatient.phoneNumber || 'Data unknown'}
              </Typography>
              <Typography variant="body1">
                <strong>Patient Notes:</strong> {selectedPatient.notes || 'Data unknown'}
              </Typography>
              <Box sx={{ marginTop: '20px' }}>
                <Button variant="contained" color="primary" onClick={handleReferPatient}>
                  Generate Referral
                </Button>
              </Box>
            </Box>
          )
        )}
      </Box>

      <Box
        sx={{
          width: '25%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: '#f5f5f5',
        }}
      >
        {!showForm && !selectedPatient && (
          <Button variant="contained" color="primary" sx={{ width: '80%' }} onClick={() => setShowForm(true)}>
            ADD NEW PATIENT PROFILE
          </Button>
        )}
      </Box>
    </Box>
  );
};
