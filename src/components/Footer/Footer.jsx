
import { Box } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: 2,
        pt: 2,
        pr: 2,
        pb: 2,
        pl: 2,
        background: 'white',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" minWidth="60px" position="relative">
        <img style={{ marginTop: "-1.75px", marginBottom: "-1.75px", marginLeft: "-1.75px", width: '50px', paddingRight: '1em' }} alt="bettering logo" src="/assets/b.png" />
      </Box>
    </Box>

  )



};

