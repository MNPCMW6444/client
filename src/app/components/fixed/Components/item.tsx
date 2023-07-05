import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Item.css';
import { Link, useLocation } from 'react-router-dom';

export interface SubItem {
  label: string;
  route: string;
}

interface ItemProps {
  icon: React.ReactNode;
  name: string;
  subItems?: SubItem[];
  onClick?: () => void;
  isOpen?: boolean;
}

const Item: React.FC<ItemProps> = ({ icon, name, subItems, onClick, isOpen }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(isOpen);
  const [linkColor, setLinkColor] = useState("#000000");
  const [iconColor, setIconColor] = useState("#3b6bb2");
  const location = useLocation();

  useEffect(() => {
    setIsSubmenuOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (!location.pathname.startsWith('/critiq')) {
      setIsSubmenuOpen(false);
    }
  }, [location.pathname]);

  const handleClick = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
    if (onClick) {
      onClick();
    }
  };

  const handleMouseLeave = () => {
    setLinkColor("#000000"); // Reset linkColor to black
    setIconColor("#3b6bb2"); // Reset iconColor to blue
  };

  return (
    <motion.div>
      <motion.div
        className={`item ${isSubmenuOpen ? 'open' : ''}`}
        whileHover={{
          backgroundColor: '#3b6bb2',
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
        whileTap={{
          backgroundColor: '#2f4d92',
        }}
        onClick={handleClick}
        onMouseEnter={() => {
          setLinkColor("white");
          setIconColor("white");
        }}
        onMouseLeave={handleMouseLeave}
        style={{ color: linkColor }} // Apply linkColor to the style
      >
        <motion.div className="icon" style={{ color: iconColor }}>{icon}</motion.div>
        <motion.span>{name}</motion.span>
      </motion.div>

      {isSubmenuOpen && subItems && (
        <div className="subItems">
          {subItems.map((subItem, index) => (
            <Link key={index} to={subItem.route} style={{ textDecoration: 'none' }}>
              <Item icon={null} name={subItem.label} onClick={onClick} isOpen={isOpen} />
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Item;
