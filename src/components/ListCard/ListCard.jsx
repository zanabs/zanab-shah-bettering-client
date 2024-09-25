import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { getCategoryImages } from '../../utils/categoryImages';

export const ListCard = ({ cardItem }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false); 
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false); 
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    phone: '',
    noPhone: false,
    slidingScale: false,
    concern: '',
  });
  const [resource, setResource] = useState({
    name: '',
    description: '',
    type: '',
    id: '',
    geometry: { coordinates: [] }, 
  });

  const handleOpenModal = (e) => {
    e.stopPropagation(); 
    setOpenModal(true);
  };

  const handleCloseModal = (e) => {
    e.stopPropagation(); 
    setOpenModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    setPatientInfo({
      ...patientInfo,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePrint = (e) => {
    e.stopPropagation(); 
    window.print();
  };

  const handleMakeReferral = (e) => {
    e.stopPropagation(); 
    setOpenModal(false);
    setOpenConfirmationModal(true);
  };

  const handleCloseConfirmationModal = (e) => {
    e.stopPropagation(); 
    setOpenConfirmationModal(false);
  };

  useEffect(() => {
  
    if (cardItem.properties) {
      setResource({
        id: cardItem.id,
        name: cardItem.properties.program_name,
        description: cardItem.properties.description || cardItem.properties.category,
        type: cardItem.properties.type,
        geometry: cardItem.geometry, 
      });
    }
  }, [cardItem]);

  return (
    <Card
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
      onClick={() => navigate(`./${resource.id}`)} 
    >
      <CardActionArea>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', width: '100%' }}>
          {getCategoryImages()[resource.type]}          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="body1" fontWeight="bold" color="textPrimary">
              {resource.name || 'Default Title'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {resource.description || 'Default description goes here.'}
            </Typography>
          </Box>
        </Box>
      </CardActionArea>

      
      {location.pathname.startsWith('/refer-patient') && (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
            sx={{ mt: 2 }}
          >
            Make Referral
          </Button>

     
          <Dialog open={openModal} onClose={handleCloseModal} onClick={(e) => e.stopPropagation()}>
            <DialogTitle>Refer Patient</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Patient Name"
                name="name"
                fullWidth
                value={patientInfo.name}
                onChange={handleInputChange}
                onClick={(e) => e.stopPropagation()} 
              />
              <TextField
                margin="dense"
                label="Patient Phone Number"
                name="phone"
                fullWidth
                value={patientInfo.phone}
                onChange={handleInputChange}
                disabled={patientInfo.noPhone}
                onClick={(e) => e.stopPropagation()} 
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="noPhone"
                    checked={patientInfo.noPhone}
                    onChange={handleInputChange}
                    onClick={(e) => e.stopPropagation()} 
                  />
                }
                label="Patient does not have a phone number"
              />

      
              {patientInfo.noPhone && (
                <Button variant="outlined" onClick={handlePrint}>
                  Print or Save as PDF
                </Button>
              )}

              <FormControlLabel
                control={
                  <Checkbox
                    name="slidingScale"
                    checked={patientInfo.slidingScale}
                    onChange={handleInputChange}
                    onClick={(e) => e.stopPropagation()} 
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
                rows={4}
                value={patientInfo.concern}
                onChange={handleInputChange}
                onClick={(e) => e.stopPropagation()} 
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button onClick={handleMakeReferral}>Make Referral</Button>
            </DialogActions>
          </Dialog>

       
          <Dialog open={openConfirmationModal} onClose={handleCloseConfirmationModal} onClick={(e) => e.stopPropagation()}>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogContent>
              <Typography variant="h6">Patient Details:</Typography>
              <Typography>Name: {patientInfo.name}</Typography>
              <Typography>Concern: {patientInfo.concern}</Typography>
              <Typography>Phone: {patientInfo.phone || 'No phone provided'}</Typography>

              <Typography variant="h6" sx={{ mt: 2 }}>Program Details:</Typography>
              <Typography>Program Name: {resource.name}</Typography>
              <Typography>Description: {resource.description}</Typography>
              <Typography>
                Google Maps Link: <a href={`https://www.google.com/maps?q=${resource.geometry.coordinates[1]},${resource.geometry.coordinates[0]}`} target="_blank" rel="noopener noreferrer">
                  View on Google Maps
                </a>
              </Typography>

              <Typography variant="body2" sx={{ mt: 2 }}>
                This information was sent to the patient phone number. Your referral is now complete.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseConfirmationModal}>Close</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Card>
  );
};
