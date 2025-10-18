import * as React from 'react';

import { GitHub as GitHubIcon, LinkedIn as LinkedInIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { Avatar, IconButton, Stack, Typography } from '@mui/material';
import { TeamMemberCardContainer } from './TeamMemberCard.style';
import { checkImagePermission } from './utils';

const TeamMemberCard = ({ profileImage, name, about, linkedin, gitHub }) => {
  const [isImgLoaded, setIsImgLoaded] = React.useState(false);
  const [isValide, setIsValide] = React.useState(false);

  React.useEffect(() => {
    const res = checkImagePermission(profileImage);
    if (res) {
      setIsValide(true);
      setIsImgLoaded(true);
    }
  }, [profileImage]);

  if (!isValide) return null;

  return (
    <TeamMemberCardContainer>
      <Stack
        display={isImgLoaded ? 'flex' : 'none'}
        direction="column"
        alignItems="center"
        justifyContent="space-around"
        padding={2}
        height={{ xs: '300px', lg: '300px', xl: '400px' }}
      >
        <Avatar
          src={profileImage}
          alt={name}
          onLoad={() => setIsImgLoaded(true)}
          sx={{
            width: { xs: '150px', lg: '150px' },
            height: { xs: '150px', lg: '150px' },
            borderWidth: { xs: '3px', lg: '5px' },
          }}
        />
        <Typography variant="h5" fontWeight={900} color="primary">
          {name}
        </Typography>
        <Typography
          variant="subtitle1"
          textAlign="center"
          sx={{
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {about}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        paddingBottom={2}
      >
        <Link to={linkedin} target="_blank">
          <IconButton>
            <LinkedInIcon fontSize="large" color="primary" />
          </IconButton>
        </Link>
        <Link to={gitHub} target="_blank">
          <IconButton>
            <GitHubIcon fontSize="large" color="primary" />
          </IconButton>
        </Link>
      </Stack>
    </TeamMemberCardContainer>
  );
};

export default TeamMemberCard;
