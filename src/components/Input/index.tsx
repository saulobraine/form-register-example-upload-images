import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type: string;
}

const Input: React.FC<InputProps> = ({ label, name, type, ...rest }) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        id={name}
        type={type}
        {...rest}
      />
    </div>
  );
};

export default Input;
