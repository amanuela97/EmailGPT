'use client';
import React, { useId } from 'react';
import CreatableSelect from 'react-select/creatable';
import { CustomInputProps } from '../utils/types';
import CustomOption from './CustomOption';

const CustomInput = ({
  type,
  value,
  options,
  handleChange,
  handleCreate,
}: CustomInputProps) => {
  const isEmail = type === 'email';

  return (
    <div className="py-2">
      <CreatableSelect
        instanceId={useId()}
        isMulti
        isClearable
        placeholder={isEmail ? 'recipients' : 'names'}
        isSearchable
        name={isEmail ? 'emails' : 'names'}
        components={{ Option: (props) => CustomOption({ ...props, isEmail }) }}
        onChange={handleChange}
        onCreateOption={handleCreate}
        options={options}
        value={value}
      />
    </div>
  );
};

export default CustomInput;
