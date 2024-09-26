import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import axios from 'axios';
import { MapCard } from '../../components/MapCard/MapCard';
import { PatientsList } from '../../components/PatientsList/PatientsList';
import { MapWithSideContent } from '../../components/MapWithSideContent/MapWithSideContent';
import { SimpleCategoryCards } from '../SimpleCategoryCardsPage/SimpleCategoryCards';
import { SimpleCategoryPage } from '../SimpleCategoryPage/SimpleCategoryPage';
import { Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom';
import AssistantIcon from '@mui/icons-material/Assistant';
import { AiSuggester } from '../../components/AISuggester/AiSuggester';
import Diversity1 from '@mui/icons-material/Diversity1';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'patients',
    title: 'Patients',
    icon: <Diversity1 />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
  {
    kind: 'header',
    title: 'Tools',
  },
  {
    segment: 'ai',
    title: 'AI Assistant',
    icon: <AssistantIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname, setPathname }) {
  const [resources, setResources] = React.useState([]);
  const [categorySelected, setCategorySelected] = React.useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  React.useEffect(() => {
    if (pathname === '/dashboard') {
      const getResources = async () => {
        try {
          const response = await axios.get(`${apiUrl}/resources`);
          setResources(response.data);
        } catch (error) {
          console.error('Error fetching data from the server:', error);
        }
      };
  
      getResources();
    }
  }, [pathname]);

  const handleCategoryClick = (categoryId) => {
    setCategorySelected(categoryId);
  }

  const [patientName, setPatientName] = React.useState('');

  React.useEffect(() => {
    const selectedPatient = localStorage.getItem('selectedPatient');
    if (selectedPatient) {
      const patient = JSON.parse(selectedPatient);
      setPatientName(patient.name);
    }
  }, [pathname]);

  const resetPatient = () => {
    localStorage.removeItem('selectedPatient');
    setPatientName('');
  }

  return (
    <Box
      sx={{
        my: '1em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        background: '#f9f9f9'
      }}
    >
      {pathname === '/dashboard' && (
        <>
          {patientName && 
            <>
              <Box display={'flex'}>
                <h2>Making referral for {patientName}</h2>
                <Button onClick={resetPatient}><ClearIcon/></Button>
              </Box>
              <AiSuggester />
            </>
          }
          {!categorySelected ? 
            <MapWithSideContent resources={resources} showSideContent={true}>            
              <SimpleCategoryCards onSelectCategory={handleCategoryClick} />
            </MapWithSideContent> 
            : <SimpleCategoryPage categoryId={categorySelected} patientName={patientName} />
          }
        </>
      )}
      {pathname === '/patients' && (
        <PatientsList onPatientClick={() => (setPathname('/dashboard'))} />
      )}
      {pathname === '/ai' && (
        <AiSuggester />
      )}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic(props) {
  const { window } = props;

  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <Link to="/"><img src='/assets/b.png' /></Link>,
        title: 'Provider Portal'
      }}
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname} setPathname={setPathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBasic.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBasic;
