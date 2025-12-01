// StyledTableCell.js
import { TableCell } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(({ cellType, ...other }) => (
  <TableCell {...other} />
))(({ theme, cellType }) => ({
  backgroundColor: '#21213E',
  color: '#FFFFFF',
  padding: '0px',
  border: 'none',
  borderRadius: '5px',
  height: '50px',
  textAlign: 'center',
  ...(cellType === 'header-top' && {
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    height: '50px',
  }),
  ...(cellType === 'header-middle' && {
    borderRadius: 0,
    height: '40px',
  }),
  ...(cellType === 'header-single' && {
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    fontSize: '20px',
  }),
}));

export default StyledTableCell;
