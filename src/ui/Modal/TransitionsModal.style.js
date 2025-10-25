import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const ModalBox = styled(Box)({
  position: 'absolute',
  color: 'white', // Text color
  backgroundColor: '#111111', // Background color
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: '2px solid #000',
  boxShadow: '24px', // Added "px" for boxShadow
  padding: '25px',
  direction: 'rtl',
});
