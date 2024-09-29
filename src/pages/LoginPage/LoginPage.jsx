
import { AppProvider, SignInPage } from '@toolpad/core';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; 


const providers = [{ id: 'credentials', name: 'Email and Password' }];


export const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate(); 

  const signIn = (provider, formData) => {
    const email = formData.get('email');
    const password = formData.get('password');
  
    setTimeout(() => {
      if (email === 'user@email.com' && password === 'password') {
        alert(`Successfully signed in with "${provider.name}".`);
        navigate('/dashboard'); 
      } else {
        alert('Invalid email or password.');
      }
    }, 300);
  };

  return (

    <AppProvider theme={theme}>
      <SignInPage signIn={signIn} providers={providers} />
    </AppProvider>
   
  );
};


