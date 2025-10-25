import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowButton } from '../../../../ui';
import { SectionContainer } from './SectionTwo';

const SectionThree = () => {
  const navigate = useNavigate();
  return (
    <>
      <SectionContainer
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          background: '#040413',
          borderTop: '1px solid #1F1F53',
        }}
      >
        <Typography variant="h3" sx={{ direction: 'rtl', marginBottom: '3rem' }} fontWeight={900}>
          איך מתקבלים?
        </Typography>
        <Typography variant="h5" sx={{ direction: 'rtl', marginBottom: '0rem' }} textAlign={'center'}>
          המועדון שלנו עם מספר מקומות מוגבל ומיועד למי שרוצה באמת ללמוד.
          <br />
          על מנת להצטרף, יש לעבור תהליך מיון קפדני.
          <br />
          המטרה המרכזית שלנו היא לעזור לכם להתקדם באופן מקצועי, לרכוש ניסיון בעבודה עצמאית,
          <br />
          ולבנות תיק עבודות מרשים שיפתח לכם דלתות בתעשייה.
          <br />
          אנחנו מחפשים מועמדים בעלי מוטיבציה גבוהה, יכולת למידה עצמית, והתמדה.
          <br />
           אם אתם שואפים להפוך למתכנתים מובילים בתעשייה, נשמח לראות אתכם נרשמים ומצטרפים אלינו!
          <br />

        </Typography>
      </SectionContainer>
      <Box sx={{
        display: 'flex', justifyContent: 'center', borderBottom: '1px solid #1F1F53', paddingBottom: '3rem',
      }}>
        <ArrowButton variant="contained" onClick={() => navigate('/sortday')}>
          להרשמה ליום מיון
        </ArrowButton>
      </Box >
    </>
  );
};

export default SectionThree;
