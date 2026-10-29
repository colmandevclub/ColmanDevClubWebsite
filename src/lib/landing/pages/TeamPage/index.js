import { Box, Container, Grid, Typography } from '@mui/material';
import CardList from '../../../../ui/CardList/CardList';
import Loader from '../../../../ui/Loader';
import { TeamMemberCard } from '../../components';
import css from './style.module.css';
import { useFirestoreFetch } from 'src/hooks/useFirestoreFetch';

export const normalizeName = (name) => name?.trim().toLowerCase().replace(/[^a-z0-9]/g, '');

export const isLegacyMember = (card = {}) => {
  const rawValue = card.legacy ?? card.isLegacy ?? card.is_legacy ?? card.isLegacyMentor;

  if (rawValue === null || rawValue === undefined || rawValue === '') {
    return false;
  }

  if (typeof rawValue === 'string') {
    return ['true', 'yes', 'legacy', '1'].includes(rawValue.trim().toLowerCase());
  }

  return Boolean(rawValue);
};

export const getMemberYear = (card = {}) => {
  const rawYear = card.year ?? card.activityYear ?? card.activity_year ?? card.membershipYear;

  if (rawYear === null || rawYear === undefined || rawYear === '') {
    return null;
  }

  if (typeof rawYear === 'string') {
    const trimmed = rawYear.trim();
    if (!trimmed) return null;

    const numericValue = Number(trimmed);
    return Number.isFinite(numericValue) ? numericValue : trimmed;
  }

  return rawYear;
};

export const getYearSortValue = (value) => {
  if (value === null || value === undefined || value === '') return Number.NEGATIVE_INFINITY;

  if (typeof value === 'number') return value;

  const matches = value.match(/(\d{4})/g) ?? [];
  if (matches.length === 0) return Number.NEGATIVE_INFINITY;

  return Number(matches[matches.length - 1]);
};

export const groupTeamCards = (cards = []) => {
  const normalizedCards = cards.map((card) => ({
    ...card,
    legacy: isLegacyMember(card),
    year: getMemberYear(card),
  }));

  const legacyCards = normalizedCards.filter((card) => card.legacy);
  const yearCards = normalizedCards.filter((card) => !card.legacy);

  const groupedByYear = yearCards.reduce((groups, card) => {
    const yearKey =
      card.year !== null && card.year !== undefined && card.year !== '' ? String(card.year) : 'Current';

    groups[yearKey] = [...(groups[yearKey] ?? []), card];
    return groups;
  }, {});

  const sortedYearKeys = Object.keys(groupedByYear).sort((yearA, yearB) => {
    const isCurrentA = yearA === 'Current';
    const isCurrentB = yearB === 'Current';

    if (isCurrentA && isCurrentB) return 0;
    if (isCurrentA) return 1;
    if (isCurrentB) return -1;

    const yearValueA = getYearSortValue(yearA);
    const yearValueB = getYearSortValue(yearB);

    if (yearValueA === yearValueB) {
      return yearA.localeCompare(yearB);
    }

    return yearValueB - yearValueA;
  });

  return {
    legacyCards,
    groupedByYear: sortedYearKeys.reduce((groups, yearKey) => {
      groups[yearKey] = groupedByYear[yearKey];
      return groups;
    }, {}),
  };
};

  //TODO: remove the using of css module
export default function TeamPage() {
  const { data: cards = [], isLoading } = useFirestoreFetch('team');
  const { legacyCards, groupedByYear } = groupTeamCards(cards);
  const yearSections = Object.entries(groupedByYear);

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

      {legacyCards.length > 0 && (
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
      )}

      {yearSections.map(([year, yearCards]) => (
        <Box key={year} component="section" aria-labelledby={`mentors-${year}`} sx={{ mt: 6, mb: 4 }}>
          <Typography id={`mentors-${year}`} component="h2" variant="h5" fontWeight={900} color="primary">
            {year === 'Current' ? 'Current Mentors' : `Mentors ${year}`}
          </Typography>
          <Loader isLoading={isLoading}>
            <CardList cards={yearCards} CardComponent={TeamMemberCard} />
          </Loader>
        </Box>
      ))}
    </Container>
  );
}
