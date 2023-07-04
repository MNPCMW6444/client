// Layout
import { Box, Container, Grid, Stack } from '@mui/material';

// Inputs
import { Autocomplete, Button, Checkbox, Radio, Slider, Switch, TextField } from '@mui/material';

// Navigation
import { AppBar, BottomNavigation, Breadcrumbs, Drawer, Link, Menu, Pagination, Stepper, Tabs } from '@mui/material';

// Surfaces
import { Accordion, Card, Paper, Tooltip } from '@mui/material';

// Feedback
import { Alert, CircularProgress, LinearProgress, Snackbar } from '@mui/material';

// Data Display
import { Avatar, Badge, Chip, Divider, List, Table, Typography } from '@mui/material';

// Utils
import { ClickAwayListener, NoSsr, Popper, Portal} from '@mui/material';

import typographyTheme from '../Fonts';
// Theme
import theme from '../whiteTheme';

// Styles
import { styled, ThemeProvider } from '@mui/material/styles';

export const PromptButton = styled(Button)(({ theme }) => ({
  color: "black" || theme.palette.primary.main,
}));

export const LockedPromptButton = styled(Button)(({ theme }) => ({
  color: "gray" || theme.palette.primary.main,
}));

export const loading = () => <Typography>Loading...</Typography>;

// Inputs
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(1),
  transition: theme.transitions.create(['background-color', 'color', 'border'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
  },
  '&.Mui-active': { 
    backgroundColor: theme.palette.primary.dark, // becomes darker blue when active
    color: theme.palette.common.white,
  },
  '&.Mui-disabled': { 
    backgroundColor: '#CCCCCC', // gray
    color: '#777777', // dark gray
  },
}));



const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  padding: theme.spacing(0.5),
  '&.Mui-checked': { color: theme.palette.primary.main },
  '&.Mui-disabled': { color: theme.palette.action.disabled },
}));

const StyledRadio = styled(Radio)(({ theme }) => ({
  padding: theme.spacing(0.5),
  '&.Mui-checked': { color: theme.palette.primary.main },
  '&.Mui-disabled': { color: theme.palette.action.disabled },
}));

const StyledSlider = styled(Slider)(({ theme }) => ({
  paddingBottom: theme.spacing(2),
  '&.Mui-active': { color: theme.palette.primary.main },
  '&.Mui-disabled': { color: theme.palette.action.disabled },
}));

const StyledSwitch = styled(Switch)(({ theme }) => ({
  padding: theme.spacing(0.5),
  '&.Mui-checked': { color: theme.palette.primary.main },
  '&.Mui-disabled': { color: theme.palette.action.disabled },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1),
  '&.Mui-focused': { borderColor: theme.palette.primary.main },
  '&.Mui-error': { borderColor: theme.palette.error.main },
  transition: theme.transitions.create('border-color', {
    duration: theme.transitions.duration.short,
  }),
}));

// Navigation
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  '&.Mui-focused': { backgroundColor: theme.palette.secondary.main },
}));

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  padding: theme.spacing(1),
  '&.Mui-selected': { color: theme.palette.primary.main },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  padding: theme.spacing(0.5),
  '&.Mui-focused': { color: theme.palette.primary.main },
}));

const StyledPagination = styled(Pagination)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  '&.Mui-selected': { color: theme.palette.primary.main },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  padding: theme.spacing(1),
  '&.Mui-selected': { color: theme.palette.primary.main },
}));

// Feedback
const StyledAlert = styled(Alert)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  '&.Mui-error': { borderColor: theme.palette.error.main },
}));

const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  '&.Mui-error': { borderColor: theme.palette.error.main },
}));

// Data Display
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  '&.Mui-focusVisible': { boxShadow: `0 0 0 4px ${theme.palette.action.focus}` },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  margin: theme.spacing(1),
  '&.Mui-error': { color: theme.palette.error.main },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(1),
  '&.Mui-disabled': { color: theme.palette.action.disabled },
  '&.Mui-selected': { backgroundColor: theme.palette.primary.main },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1),
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.fontSize,
  '&.Mui-error': { color: theme.palette.error.main },
}));

// Utils
const StyledPopper = styled(Popper)(({ theme }) => ({
  padding: theme.spacing(1),
}));

// Layout
const StyledBox = styled(Box)(({ theme }) => ({
  // Enter your styles for Box component here
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  // Enter your styles for Container component here
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  // Enter your styles for Grid component here
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  // Enter your styles for Stack component here
}));

// Inputs
const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  // Enter your styles for Autocomplete component here
}));

// Navigation

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  // Enter your styles for Breadcrumbs component here
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  // Enter your styles for Drawer component here
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  // Enter your styles for Menu component here
}));

const StyledStepper = styled(Stepper)(({ theme }) => ({
  // Enter your styles for Stepper component here
}));

// Surfaces
const StyledAccordion = styled(Accordion)(({ theme }) => ({
  // Enter your styles for Accordion component here
}));

const StyledCard = styled(Card)(({ theme }) => ({
  // Enter your styles for Card component here
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  // Enter your styles for Paper component here
}));

const StyledTooltip = styled(Tooltip)(({ theme }) => ({
  // Enter your styles for Tooltip component here
}));

// Feedback
const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  // Enter your styles for CircularProgress component here
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  // Enter your styles for LinearProgress component here
}));

// Data Display
const StyledList = styled(List)(({ theme }) => ({
  // Enter your styles for List component here
}));

const StyledTable = styled(Table)(({ theme }) => ({
  // Enter your styles for Table component here
}));

// Utils
const StyledClickAwayListener = styled(ClickAwayListener)(({ theme }) => ({
  // Enter your styles for ClickAwayListener component here
}));

const StyledNoSsr = styled(NoSsr)(({ theme }) => ({
  // Enter your styles for NoSsr component here
}));

const StyledPortal = styled(Portal)(({ theme }) => ({
  // Enter your styles for Portal component here
}));

// Styles
const StyledThemeProvider = styled(ThemeProvider)(({ theme }) => ({
  // Enter your styles for ThemeProvider component here
}));

export {
  StyledBox,
  StyledContainer,
  StyledGrid,
  StyledStack,
  StyledAutocomplete,
  StyledButton,
  StyledCheckbox,
  StyledRadio,
  StyledSlider,
  StyledSwitch,
  StyledTextField,
  StyledAppBar,
  StyledBottomNavigation,
  StyledBreadcrumbs,
  StyledDrawer,
  StyledLink,
  StyledMenu,
  StyledPagination,
  StyledStepper,
  StyledTabs,
  StyledAccordion,
  StyledCard,
  StyledPaper,
  StyledTooltip,
  StyledAlert,
  StyledCircularProgress,
  StyledLinearProgress,
  StyledSnackbar,
  StyledAvatar,
  StyledBadge,
  StyledChip,
  StyledDivider,
  StyledList,
  StyledTable,
  StyledTypography,
  StyledClickAwayListener,
  StyledNoSsr,
  StyledPopper,
  StyledPortal,
  StyledThemeProvider,
};