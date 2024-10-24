import { Container, Typography } from '@mui/material';
import CardList from '../../../../ui/CardList/CardList';
import Loader from '../../../../ui/Loader';
import { TeamMemberCard } from '../../components';
import css from './style.module.css';
import { useFirestoreFetch } from 'src/hooks/useFirestoreFetch';

//TODO: remove the using of css module
export default function TeamPage() {
  const { data: cards, isLoading } = useFirestoreFetch('team');

  return (
    <Container maxWidth="lg" sx={{ my: 2 }}>
      <Typography
        variant="h3"
        sx={{
          textAlign: 'center',
          marginY: '1rem',
          fontWeight: 900,
        }}
      >
        <span className={css['text-yellow']}>Our</span>Team
      </Typography>
      <Loader isLoading={isLoading}>
        <CardList cards={cards} CardComponent={TeamMemberCard} />
      </Loader>
    </Container>
  );
}
