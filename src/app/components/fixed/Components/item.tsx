import React from 'react';
import { motion } from 'framer-motion';
import './Item.css';
import { WidthFull } from '@mui/icons-material';

interface ItemProps {
  icon: React.ReactNode;
  name: string;
}

const Item: React.FC<ItemProps> = ({ icon, name }) => {
  return (
    <motion.div 
    >
    <motion.div
      className='item'
      whileHover={{
        backgroundColor: '#3b6bb2',
        color: 'white',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(5.5px)',
        WebkitBackdropFilter: 'blur(5.5px)',
        border: '1px solid rgba( 255, 255, 255, 0.18 )',
        cursor: 'pointer',
      }}
      transition={{
        type: 'none',
        duration: 0.1,
      }}
    >
      <div className='icon'>
        <motion.div>
          {icon}
        </motion.div>
      </div>
      <motion.span>{name}</motion.span>
    </motion.div>
    </ motion.div>
  );
};

export default Item;
