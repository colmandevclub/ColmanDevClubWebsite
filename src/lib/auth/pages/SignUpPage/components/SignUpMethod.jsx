import { EmailRounded } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { Button, Card, Stack, Typography } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from 'src/config/firebase-config';
import { SigninMethods } from '../SignUpPage';
import { useNavigate } from 'react-router-dom';


const SignUpMethod = ({ setMethodClicked, setEmail, setName, setFormValues, setProfilePicPreview }) => {

  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      setEmail(user.email);
      setName(user.displayName);
      setProfilePicPreview(user.photoURL);
      setFormValues({
        email: user.email,
        name: user.displayName,
        profilePic: user.photoURL,
      });
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setMethodClicked(SigninMethods.GOOGLE);
    }
  };

  return (
    <Card
      variant="filled"
      sx={{
        height: { xs: '100%', lg: '30svh' },
        width: { xs: '100%', lg: '35svw' },
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        marginBottom: '150px',
      }}
    >
      <Stack p={{ xs: 5, lg: 1 }} gap={5}>
        <Stack>
          <Typography variant="caption" color={'primary'} textAlign={'end'}>
            *Recommended
          </Typography>
          <Button
            variant="outlined"
            endIcon={<GoogleIcon />}
            fullWidth
            sx={{ justifyContent: 'space-between' }}
            onClick={() => handleGoogleSignIn()}
          >
            Submit using Google
          </Button>
        </Stack>
        <Button
          variant="outlined"
          fullWidth
          sx={{ justifyContent: 'space-between' }}
          onClick={() => setMethodClicked(SigninMethods.FIREBASE)}
          endIcon={<EmailRounded />}
        >
          Submit using Email
        </Button>
      </Stack>
    </Card>
  );
};

export default SignUpMethod;
