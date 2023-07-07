import React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import LightbulbIcon from '@mui/icons-material/EmojiObjects';
import SpeedIcon from '@mui/icons-material/Speed';
import BacklogIcon from '@mui/icons-material/PlaylistAddCheck';

const actions = [
  { name: 'Backlog', icon: <BacklogIcon />, color: 'blue' },
  { name: 'Acceleration', icon: <SpeedIcon />, color: 'green' },
  { name: 'Enter idea', icon: <LightbulbIcon />, color: 'yellow' },
  // Add more actions as needed
];

const QuickMenu = () => {
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 9999, // Adjust the zIndex value as needed
      }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          style={{ backgroundColor: action.color }}
        />
      ))}
    </SpeedDial>
  );
};

export default QuickMenu;
