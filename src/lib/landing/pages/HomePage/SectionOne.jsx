import { Grid, ImageListItem, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Photo from 'src/assets/ef1b7b898f8d650f0ecdcb6ad5b9baea.png';
import EntranceAnimation from '../../../../animation/EntranceAnimation';
import css from './style.module.css';
import LangCard from '../../components/LangCard/LangCard';
import { ArrowButton } from 'src/ui';
import { typesCards } from '../../components/LangCard/data';

const SectionOne = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      gridTemplateColumns={'5fr 1fr'}
      py={{ xs: 1, md: 4 }}
      px={{ xs: 2, lg: 10 }}
      spacing={{ xs: 0, lg: 2 }}
      alignItems={'center'}
    >
      <Grid item xs={12} md={6} lg={6}>
        <ImageListItem
          sx={{
            width: { md: '80%', lg: '95%' },
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img src={Photo} className={css['photo']} alt="programmers" loading="lazy"></img>
        </ImageListItem>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Stack paddingLeft={{ xs: 0, lg: 5 }} alignItems={{ xs: 'center', lg: 'flex-end' }} paddingBottom={{ xs: 10 }}>
          <Typography
            fontSize={{ xs: '3rem', md: '5rem', lg: '6rem' }}
            fontWeight={900}
            textAlign={{ xs: 'center', md: 'end' }}
          >
            מועדון <span className={css['text-yellow']}>המפתחים/ות</span>
          </Typography>
          <Typography
            textAlign={{ xs: 'center', md: 'start' }}
            fontSize={{ xs: '1rem', md: '1.1rem', lg: '1.2rem' }}
            sx={{ direction: 'rtl' }}
          >
            המועדון המפתחים של המכללה למינהל הוקם במטרה להקנות ידע לסטודנטים וסטודנטיות
            ולהתפתח בתחום ה- <b> Fullstack</b>. <br />

            ללמוד לפתח זה דבר אחד - לממש את הלמידה זה דבר אחר לגמרי. <br />
            השאיפה שלנו היא ללמד איך לפתח טוב יותר, להתנסות בצורה פרקטית כמה שיותר ולהכיר את הטכנולוגיות הכי חדישות ומתקדמות בשוק. <br />
            באמצעות המנטורים והכלים שתקבלו, תממשו את הידע שלכם ותיקחו אותו צעד אחד קדימה!
            <br />
            <br />
          </Typography>
          <ArrowButton onClick={() => navigate('/assessment-day')}>להרשמה ליום מיון</ArrowButton>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Grid container gap={{ xs: 2, md: 4 }} justifyContent={'center'} sx={{display: 'flex', flexDirection: 'row-reverse'}}>
          {typesCards.map((card, index) => {
            return (
              <Grid key={card.id} item xs={12} md={3} lg={2} >
                <EntranceAnimation animationDelay={index * 0.2}>
                  <LangCard {...card} />
                </EntranceAnimation>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SectionOne;
