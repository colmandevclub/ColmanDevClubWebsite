import * as React from 'react';

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Tooltip,
  IconButton,
  Chip,
  Box,
} from '@mui/material';

import { GitHub as GitHubIcon, Language as LanguageIcon } from '@mui/icons-material/';
import { LanguageChip } from './LanguageChip';
import { ExpandedList } from 'src/ui';

const ProjectCard = ({ image_url, title, description, github_url, website_url, language }) => {
  return (
    <Card sx={{ direction: 'rtl' }} >
      <CardMedia
        sx={{ borderRadius: '8px', height: 225, objectFit: 'cover' }}
        image={image_url}
        title={`${title} image`}
      />
      <CardContent>
        <Box display='flex' flexDirection='row' justifyContent='space-between' flexWrap='wrap'>
          <Typography gutterBottom variant="h4" component="div" color={'primary'} fontWeight={900} width={'65%'} >
            {title}
          </Typography>
          <Box minWidth={88} display='flex' justifyContent='center' alignItems='start' sx={{direction: 'ltr'}}>
            {github_url && (
              <Tooltip title="Check out the project on GitHub">
                <IconButton href={github_url} target="_blank" rel="noreferrer">
                  <GitHubIcon sx={{ fontSize: '1.75rem' }} color="primary" />
                </IconButton>
              </Tooltip>
            )}
            {website_url && (
              <Tooltip title="Check out the project on web">
                <IconButton href={website_url} target="_blank" rel="noreferrer">
                  <LanguageIcon sx={{ fontSize: '1.75rem' }} color="primary" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
        <Typography variant="body1" height={48} alignContent='center'>
            {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ gap: '5px', flexWrap: "wrap" }}>
        <ExpandedList
          list={language} 
          item={(lang) => <Chip key={lang} label={<LanguageChip lang={lang}/>} />} 
        />
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
