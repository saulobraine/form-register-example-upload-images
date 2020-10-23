import React from 'react';
import './styles.css';

interface RadioBoxProps {
  title: string;
}

const RadioBox: React.FC<RadioBoxProps> = ({ title, children }) => {
  return (
    <div className="radio-block">
      <p>{title}</p>
      {children}
    </div>
  );
};

export default RadioBox;
