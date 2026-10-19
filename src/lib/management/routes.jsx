import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';

export const primaryList = [
  { text: 'Dashboard', icon: <DashboardIcon />, link: '/' },
  { text: 'Board', icon: <ViewKanbanIcon />, link: '/board' },
  { text: 'Projects', icon: <ArticleIcon />, link: '/projects' },
  { text: 'Messages', icon: <MailIcon />, link: '/messages' },
];

export const secondaryList = [
  { text: 'All mail', icon: <InboxIcon />, link: '/all-mail' },
  { text: 'Trash', icon: <MailIcon />, link: '/trash' },
  { text: 'Spam', icon: <MailIcon />, link: '/spam' },
];

export const tertiaryList = [{ text: 'Settings', icon: <SettingsIcon />, link: '/settings' }];
