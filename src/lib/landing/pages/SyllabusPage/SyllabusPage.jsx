import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import Loader from '../../../../ui/Loader';
import useGoogleSheetsData from '../../../../hooks/useSheets';
import { SyllabusCard } from './SyllabusCard';
import { syllabusCsvDataParser } from './helpers';


const SyllabusPage = () => {
  const { data, isLoading, error } = useGoogleSheetsData();

  if (error) {
    console.error(error);
    return (
      <Container>
        <Typography variant="h2">Error</Typography>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container>
        <Loader isLoading={isLoading}></Loader>
      </Container>
    );
  }

  const csvData = syllabusCsvDataParser(data);

  return (
    <Container display="flex"  width="100%">
      <Grid 
        container 
        justifyContent={"center"} 
        alignItems={"center"} 
        rowSpacing={2}  
        columnSpacing={{ xs: 2, sm: 2, md: 4 }} 
        spacing={{ xs: 2, md: 2 }}
        px={{ xs: 1,  sm: 1, md: 5 }}
        py={2}
      >
        {csvData?.map((lesson, index) => {
          return (
            <SyllabusCard 
              key={lesson.id}
              youtubeVideoIDs={lesson.youtube} 
              exercise={lesson.exercise} 
              subject={lesson.subject} 
              index={index}
              image={lesson.placeholder}
            />
          );
        })}
      </Grid>
    </Container>
  );
};

export default SyllabusPage;
