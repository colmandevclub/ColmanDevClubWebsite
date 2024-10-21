import { Box, Grid, Typography, styled } from '@mui/material';
import React from 'react';
import Video from '../../../../assets/videos/homepageVid.mp4';

export const SectionContainer = styled(Box)(({ theme }) => ({
  video: {
    borderRadius: 20,
    boxShadow: "5px 9px 12px 11px rgba(0, 0, 0, 0.4)"
  },
  padding: theme.spacing(4, 10),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4, 4),
    video: {
      width: '100%',
      height: '100%',
      margin: "0 auto"
    }
  },
  [theme.breakpoints.up('xl')]: {
    padding: theme.spacing(8, 20),

  },
}));

const SectionTwo = () => {
  return (
    <SectionContainer
      sx={{ background: 'linear-gradient(306deg, rgba(246, 201, 39, 1), rgb(180, 142, 5))', direction: 'rtl' }}
    >
      <Typography variant="h3" textAlign={'center'} sx={{ direction: 'rtl', marginBottom: '3rem' }} fontWeight={900}>
        אז מה צפוי לנו?
      </Typography>
      <Grid container alignItems={'center'} justifyContent={"center"} gap={25}>
        <Grid item xs={12} md={4}>
          <video muted loop playsInline autoPlay>
            <source src={Video}/>
          </video>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={8}>
            <Grid item xs={12} md={6}>
              <Typography variant="h1" color="secondary" fontWeight={900}>
                1.
              </Typography>
              <Typography variant="h5" color={'secondary'} fontWeight={900}>
                במהלך המפגשים, נעבוד עם הכלים והטכנולוגיות החדישות בשוק וניישם אותם בפרויקטים אמיתיים.<br />
                נתחלק לצוותים המדמים את עולם הפיתוח בתעשייה ונצבור ניסיון מעשי שיכין אתכם לעבודה בתחום ה-FullStack.</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h1" color="secondary" fontWeight={900}>
                2.
              </Typography>
              <Typography variant="h5" color={'secondary'} fontWeight={900}>
                לאורך כל התהליך, יעמדו לרשותכם המנטורים המצוינים שלנו, שילוו אתכם צעד אחר צעד.<br />
                יחד, נפתח מיומנויות מפתח ונתנסה בטכנולוגיות החדשניות ביותר בשוק, כדי להפוך אתכם מסטודנטים למתכנתים מקצועיים.</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h1" color="secondary" fontWeight={900}>
                3.
              </Typography>
              <Typography variant="h5" color={'secondary'} fontWeight={900}>
                מטרתנו היא שתצברו ניסיון מעשי בתעשיית ההייטק, תבנו תיק עבודות מרשים ותהפכו לחלק בלתי נפרד מקהילת מפתחים חברית, חברתית וחזקה.</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h1" color="secondary" fontWeight={900}>
                4.
              </Typography>
              <Typography variant="h5" color={'secondary'} fontWeight={900}>
                בנוסף למפגשים השבועיים, המועדון מארגן האקתונים, סדנאות, סיורים מקצועיים, ומפגשי גיבוש. החוויה שתרכשו כאן תקפיץ את הקריירה שלכם ותכין אתכם לשוק העבודה בצורה המיטבית!
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </SectionContainer>
  );
};

export default SectionTwo;
