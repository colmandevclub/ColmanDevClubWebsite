import * as React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Chip,
  Stack,
  Box,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { checkImagePermission } from './utils';

const capitalizeWords = (str) => {
  if (!str) return '';
  return String(str).replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatDate = (value) => {
  if (!value) return '';
  if (value.seconds !== undefined) {
    const date = new Date(
      value.seconds * 1000 + (value.nanoseconds ? value.nanoseconds / 1e6 : 0),
    );
    return date.toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

const difficultyColor = (difficulty) => {
  if (!difficulty) return 'default';
  const d = String(difficulty).toLowerCase();
  if (d.includes('easy')) return 'success';
  if (d.includes('medium') || d.includes('intermediate')) return 'warning';
  if (d.includes('hard') || d.includes('difficult')) return 'error';
  return 'default';
};

const InterviewQuestionCard = ({
  question,
  title,
  answer,
  tags,
  createdBy,
  createdAt,
  difficulty,
  onAction,
}) => {
  const [isValidImage, setIsValidImage] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!createdBy.profileImage) {
      setIsValidImage(false);
      return;
    }
    try {
      const res = checkImagePermission(createdBy.profileImage);
      if (res && typeof res.then === 'function') {
        res
          .then((val) => setIsValidImage(Boolean(val)))
          .catch(() => setIsValidImage(false));
      } else {
        setIsValidImage(Boolean(res));
      }
    } catch {
      setIsValidImage(false);
    }
  }, [createdBy.profileImage]);

  const qTitle = title ? capitalizeWords(title) : 'Untitled Question';
  const qQuestion = question ? capitalizeWords(question) : 'Untitled Question';
  const qTags = (() => {
    if (!tags) return [];
    if (typeof tags === 'string') {
      return tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    }
    if (Array.isArray(tags)) {
      return tags.map((t) => String(t).trim()).filter(Boolean);
    }
    return [];
  })();
  const qDifficulty = difficulty ? difficulty : null;
  const body = answer ? answer : 'No answer provided.';

  const initials = String(createdBy.name || '')
    .split(' ')
    .map((p) => (p ? p[0] : ''))
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 1100,
          borderRadius: 2,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
        role='article'
        aria-label={`Interview question card: ${qTitle}`}
      >
        <CardHeader
          sx={{
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: '4px',
          }}
          title={
            <Box display='flex' alignItems='flex-start' gap={2}>
              {isValidImage ? (
                <Avatar
                  src={createdBy.profileImage}
                  alt={qTitle}
                  sx={{ width: 32, height: 32 }}
                />
              ) : (
                <Avatar
                  sx={{ width: 32, height: 32, bgcolor: 'primary.light' }}
                  aria-hidden
                >
                  {initials || <HelpOutlineIcon color='primary' />}
                </Avatar>
              )}

              <Box>
                <Typography
                  variant='h5'
                  component='div'
                  sx={{ fontWeight: 700, lineHeight: 1.1 }}
                >
                  {qTitle}
                </Typography>
              </Box>
            </Box>
          }
        />

        {qDifficulty && (
          <Box display='flex' justifyContent='center' mt={1}>
            <Chip
              label={String(qDifficulty)}
              size='small'
              color={difficultyColor(qDifficulty)}
              variant='outlined'
              sx={{ textTransform: 'capitalize' }}
              aria-label={`Difficulty: ${qDifficulty || 'unspecified'}`}
            />
          </Box>
        )}

        <Divider sx={{ mt: 2, mb: 1 }} />

        <CardContent sx={{ pt: 1, px: 3 }}>
          <Typography
            variant='body1'
            color='text.primary'
            sx={{
              whiteSpace: 'pre-line',
              fontSize: { xs: '1rem', md: '1.2rem' },
              lineHeight: 1.6,
            }}
          >
            {qQuestion}
          </Typography>
        </CardContent>

        <CardActions
          sx={{
            px: 2,
            py: 1.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box display='flex' gap={1} justifyContent='center'>
            <Button
              size='small'
              variant='outlined'
              onClick={handleOpen}
              aria-haspopup='dialog'
            >
              View
            </Button>
          </Box>
        </CardActions>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='md'
        aria-labelledby={`dialog-title-${qTitle}`}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              id={`dialog-title-${qTitle}`}
              variant='h6'
              component='div'
              sx={{ fontWeight: 700 }}
            >
              {qTitle}
            </Typography>
            {qDifficulty && (
              <Chip
                label={(qDifficulty || 'unspecified').toString()}
                size='small'
                color={difficultyColor(qDifficulty)}
                variant='outlined'
                sx={{ textTransform: 'capitalize' }}
              />
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isValidImage ? (
              <Avatar
                src={createdBy.profileImage}
                alt={qTitle}
                sx={{ width: 40, height: 40 }}
              />
            ) : (
              <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.light' }}>
                {initials || <HelpOutlineIcon color='primary' />}
              </Avatar>
            )}
            {createdBy.name || ''}
          </Box>
        </DialogTitle>

        <DialogContent dividers>
          <Box mb={2}>
            <Typography variant='subtitle2' color='primary.light' gutterBottom>
              Question
            </Typography>
            <Typography variant='body1' sx={{ whiteSpace: 'pre-line' }}>
              {qQuestion}
            </Typography>
          </Box>

          <Box mb={2}>
            <Typography variant='subtitle2' color='primary.light' gutterBottom>
              Answer
            </Typography>
            <Typography variant='body1' sx={{ whiteSpace: 'pre-line' }}>
              {body}
            </Typography>
          </Box>

          <Box display='flex' gap={1} alignItems='center' flexWrap='wrap'>
            <Typography variant='subtitle2' color='primary.light'>
              Tags:
            </Typography>
            {Array.isArray(qTags) && qTags.length > 0 ? (
              <Stack
                direction='row'
                spacing={1}
                alignItems='center'
                flexWrap='wrap'
              >
                {qTags.map((t, i) => (
                  <Chip
                    key={`${t}-${i}`}
                    label={t}
                    size='small'
                    sx={{ m: 0.25 }}
                  />
                ))}
              </Stack>
            ) : (
              <Typography variant='body2' color='primary.light'>
                No tags
              </Typography>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'space-between' }}>
          <Box
            display='flex'
            gap={1}
            alignItems='center'
            justifyContent='space-between'
            flexWrap='wrap'
          >
            <Typography variant='body2' color='text.primary'>
              {formatDate(createdAt)}
            </Typography>
          </Box>
          <Button onClick={handleClose} size='small' variant='outlined'>
            Close
          </Button>
          {onAction && (
            <Button
              onClick={() => {
                handleClose();
                onAction();
              }}
              size='small'
              variant='contained'
            >
              Discussasasa
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

InterviewQuestionCard.propTypes = {
  question: PropTypes.string,
  title: PropTypes.string,
  answer: PropTypes.string,
  image: PropTypes.string,
  tags: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  createdBy: PropTypes.string,
  createdAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.object,
  ]),
  difficulty: PropTypes.string,
  onAction: PropTypes.func,
};

InterviewQuestionCard.defaultProps = {
  question: '',
  title: '',
  answer: '',
  image: '',
  tags: [],
  createdBy: '',
  createdAt: null,
  difficulty: '',
  onAction: undefined,
};

export default InterviewQuestionCard;
