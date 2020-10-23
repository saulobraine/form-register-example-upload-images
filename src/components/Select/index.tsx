import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: Array<{
    value: string;
    label: string;
  }>
}

const Select: React.FC<SelectProps> = ({ name, label, options, ...rest }) => {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        {...rest}
      >
        <option hidden>Selecione uma opção</option>
        {options.map((option, index) => {
          return (
            <option
              key={`${option.label}_${index}`}
              value={option.value}>
              {option.label}
            </option>
          )
        })}
      </select>
    </div>
  );
};

export default Select;
