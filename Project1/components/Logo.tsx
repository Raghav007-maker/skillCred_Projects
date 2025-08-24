
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      stroke="currentColor" 
      strokeWidth="1.5"
    >
      <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 7L12 12M22 7L12 12M12 22V12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 12L7 9.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 9.5L12 12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 6.5V12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default Logo;
