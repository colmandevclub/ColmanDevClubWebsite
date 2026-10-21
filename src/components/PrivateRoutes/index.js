import React from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';

import { CSVLink } from 'react-csv';
import { fetchData } from '../../config/firebase-utils';

const enumCsvFields = {
  email: 'email',
  experience: 'experience',
  experienceDetails: 'experienceDetails',
  fieldOfStudy: 'fieldOfStudy',
  id: 'id',
  phoneNumber: 'phoneNumber',
  program: 'program',
  schoolYear: 'schoolYear',
  date: 'date',
};

const PrivateRoutes = () => {
  const [password, setPassword] = React.useState('');
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [users, setUsers] = React.useState([]);

  const csvData = [Object.keys(enumCsvFields)];

  const handleSubmit = () => {
    if (password === process.env.REACT_APP_PASSWORD) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const test = async () => {
    if (!isAdmin) return;
    const usersArray = await fetchData('users');
    // first take the formValues, after it take the values from the enumCsvFields and map them to an array.
    const formattedData = usersArray.map(({ formValues, newUser }) => {
      //  Object.values(enumCsvFields) = ["email", "experience", "experienceDetails", "fieldOfStudy", "id", "phoneNumber", "program", "schoolYear"]
      const valueArray = Object.values(enumCsvFields).map((key) => {
        if (formValues) return formValues[key];
        if (newUser) return newUser[key];
        return '';
      });
      return valueArray;
    });

    csvData.push(...formattedData);
    setUsers(csvData);
  };

  React.useEffect(() => {
    test();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  return (
    <Box textAlign="center" marginTop="8rem">
      {!isAdmin && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <TextField
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="outlined-basic"
            label="Enter Password"
            variant="outlined"
          />
          <Button onClick={handleSubmit} variant="outlined">
            Submit
          </Button>
        </Box>
      )}
      {isAdmin && users && (
        <>
          <Typography variant="h4" color="white" marginBottom={'2rem'}>
            Total Registers: {users.length}
          </Typography>
          <CSVLink
            style={{
              textDecoration: 'none',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.5rem',
            }}
            data={users}
          >
            Download me (CSV File)
          </CSVLink>
        </>
      )}
    </Box>
  );
};

export default PrivateRoutes;
