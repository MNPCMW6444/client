import React, { useState } from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import LightbulbIcon from '@mui/icons-material/EmojiObjects';
import SpeedIcon from '@mui/icons-material/Speed';
import BacklogIcon from '@mui/icons-material/PlaylistAddCheck';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box, useTheme, useMediaQuery } from '@mui/material';

const actions = [
  { name: 'Backlog', icon: <BacklogIcon />, color: 'blue' },
  { name: 'Acceleration', icon: <SpeedIcon />, color: 'green' },
  { name: 'Enter idea', icon: <LightbulbIcon />, color: 'yellow' },
  // Add more actions as needed
];

const QuickMenu = () => {
  const [open, setOpen] = useState(false);
  const [ideaText, setIdeaText] = useState('');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md')); // Use useMediaQuery hook

  const handleClick = (action: { name: string }) => {
    if (action.name === 'Enter idea') {
      setOpen(true);
    } else {
      // Handle other actions
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleIdeaTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdeaText(event.target.value);
  };

  const handleSaveIdea = () => {
    console.log('Idea:', ideaText);
    handleClose();
  };

  return (
    <Box>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: theme.zIndex.speedDial,
        }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            style={{ backgroundColor: action.color }}
            onClick={() => handleClick(action)}
          />
        ))}
      </SpeedDial>

      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen} // Use the fullScreen prop
        fullWidth
      >
        <DialogContent>
          <TextField
            autoFocus
            multiline
            margin="dense"
            label="Enter idea"
            fullWidth
            value={ideaText}
            onChange={handleIdeaTextChange}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", mb: 1, }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveIdea} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QuickMenu;
