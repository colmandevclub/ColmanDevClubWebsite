import { Box, Container, Grid, Typography } from '@mui/material';
import CardList from '../../../../ui/CardList/CardList';
import Loader from '../../../../ui/Loader';
import { TeamMemberCard } from '../../components';
import css from './style.module.css';
import { useFirestoreFetch } from 'src/hooks/useFirestoreFetch';

const activeMentorNames = [
  'tamir abutbul',
  'gil heller',
  'tal braun',
  'elad abutbul',
  'almog lavi',
  'natali mizrahi',
  'tehila gadidiyan',
];
const legacyMentorNames = ['tamir abutbul', 'gil heller', 'oz itzak', 'oz izhak'];

const normalizeName = (name) => name?.trim().toLowerCase().replace(/[^a-z0-9]/g, '');

  //TODO: remove the using of css module
export default function TeamPage() {
  const { data: cards = [], isLoading } = useFirestoreFetch('team');
  const activeCards = activeMentorNames.flatMap((name) =>
    cards.filter((card) => normalizeName(card.name) === normalizeName(name)),
  );
  const legacyCards = legacyMentorNames.flatMap((name) =>
    cards.filter((card) => normalizeName(card.name) === normalizeName(name)),
  );
  const pastCards = cards.filter(
    (card) =>
      !activeMentorNames.some((name) => normalizeName(name) === normalizeName(card.name)) &&
      !legacyMentorNames.some((name) => normalizeName(name) === normalizeName(card.name)),
  );

  return (
    <Container maxWidth="lg" sx={{ my: 2 }}>
      <Typography
        component="h1"
        variant="h3"
        sx={{
          textAlign: 'center',
          marginY: '1rem',
          fontWeight: 900,
        }}
      >
        <span className={css['text-yellow']}>Our</span>Team
      </Typography>
      <Box component="section" aria-labelledby="active-mentors" sx={{ mt: 4 }}>
        <Typography id="active-mentors" component="h2" variant="h5" fontWeight={900} color="primary">
          Active Mentors
        </Typography>
     
        <Loader isLoading={isLoading}>
          <CardList cards={activeCards} CardComponent={TeamMemberCard} />
        </Loader>
      </Box>
      <Box component="section" aria-labelledby="legacy-mentors" sx={{ mt: 6 }}>
        <Typography id="legacy-mentors" component="h2" variant="h5" fontWeight={900} color="primary">
          Legacy Mentors
        </Typography>
        <Loader isLoading={isLoading}>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {legacyCards.map((card, index) => (
              <Grid key={`${card.name}-${index}`} item xs={12} sm={6} md={3}>
                <TeamMemberCard {...card} legacy />
              </Grid>
            ))}
          </Grid>
        </Loader>
      </Box>
      <Box component="section" aria-labelledby="past-mentors" sx={{ mt: 6, mb: 4 }}>
        <Typography id="past-mentors" component="h2" variant="h5" fontWeight={900} color="primary">
          Past Mentors 2025–2026
        </Typography>
        <Typography sx={{ mt: 1, opacity: 0.7 }}>
          Celebrating the mentors who have been part of our journey.
        </Typography>
        <Loader isLoading={isLoading}>
          <CardList cards={pastCards} CardComponent={TeamMemberCard} />
        </Loader>
      </Box>
    </Container>
  );
}
