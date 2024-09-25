
import { AppProvider, SignInPage } from '@toolpad/core';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // assuming you're using react-router-dom

// preview-start
const providers = [{ id: 'credentials', name: 'Email and Password' }];
// preview-end

export const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate(); // Hook for navigation

  const signIn = (provider, formData) => {
    const email = formData.get('email');
    const password = formData.get('password');
  
    setTimeout(() => {
      if (email === 'user@email.com' && password === 'password') {
        alert(`Successfully signed in with "${provider.name}".`);
        navigate('/dashboard'); // Redirect to the dashboard after successful login
      } else {
        alert('Invalid email or password.');
      }
    }, 300);
  };

  return (
    // preview-start
    <AppProvider theme={theme}>
      <SignInPage signIn={signIn} providers={providers} />
    </AppProvider>
    // preview-end
  );
};


