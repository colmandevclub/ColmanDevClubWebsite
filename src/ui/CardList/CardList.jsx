import React from 'react';

import { Grid } from '@mui/material';

import ProjectCard from '../../lib/landing/components/ProjectCard/ProjectCard';
import EntranceAnimation from '../../animation/EntranceAnimation';

const CardList = ({ cards, CardComponent = ProjectCard, AnimationComponent = EntranceAnimation }) => {
  return (
    <Grid container spacing={3} sx={{ mt: '5px' }}>
      {cards.map((card, index) => {
        return (
          <Grid key={card + index} item xs={12} sm={6} md={3} lg={3} xl={3}>
            <AnimationComponent animationDelay={index * 0.2}>
              <CardComponent {...card} />
            </AnimationComponent>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CardList;
