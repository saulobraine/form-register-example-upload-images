import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Radio: React.FC<RadioProps> = ({ id, name, value, label, onChange, ...rest }) => {

  return (
    <>
      <input type="radio" id={id} name={name} value={value} onChange={onChange} {...rest} />
      <label htmlFor={id}>{label}</label>
    </>
  );
};

export default Radio;
