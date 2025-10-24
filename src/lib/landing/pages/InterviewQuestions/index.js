import { Container, Typography } from '@mui/material';
import CardList from '../../../../ui/CardList/CardList';
import Loader from '../../../../ui/Loader';
import { InterviewQuestionCard } from '../../components';
import css from './style.module.css';
import { useFirestoreFetch } from 'src/hooks/useFirestoreFetch';
import { useEffect, useState } from 'react';

export default function InterviewPage() {
  const { data: cards, isLoading } = useFirestoreFetch('interview_questions');
  const { data: team } = useFirestoreFetch('team');
  const [cardsWithCreatedBy, setCardsWithCreatedBy] = useState([]);

  useEffect(() => {
    if (!cards || !team) return;

    const teamMap = team.reduce((acc, member) => {
      const name = (member.name || member.displayName || member.fullName || '').trim();
      if (name) acc[name.toLowerCase()] = member;
      return acc;
    }, {});

    const mergedCards = cards.map((card) => {
      if (!card || !card.createdBy) return card;

      const createdByName =
      typeof card.createdBy === 'string'
        ? card.createdBy.trim()
        : (card.createdBy.name || card.createdBy.displayName || card.createdBy.fullName || '').trim();

      const matched = createdByName ? teamMap[createdByName.toLowerCase()] : null;

      return {
      ...card,
        createdBy: matched || { name: card.createdBy },
      };
    });
    console.log(mergedCards)
    setCardsWithCreatedBy(mergedCards);
  }, [cards, team]);

  return (
    <Container maxWidth="lg" sx={{ my: 2 }}>
      <Typography
        variant="h3"
        sx={{ textAlign: 'center', marginY: '1rem', fontWeight: 900 }}
      >
        <span className={css['text-yellow']}>Interview</span>Questions
      </Typography>

      <Loader isLoading={isLoading}>
        <CardList cards={cardsWithCreatedBy} CardComponent={InterviewQuestionCard} />
      </Loader>
    </Container>
  );
}