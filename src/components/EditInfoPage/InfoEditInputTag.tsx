import React from 'react'
import PropTypes from 'prop-types';
import { InputTagProps } from '../../types/Input.type';

const InfoEditInputTag: React.FC<InputTagProps> = ({ inputType, value, defaultValue, onChange, isErrored }) => {
  const isDisabled = inputType.label === 'email' || inputType.label === 'nickname';

  return (
    <div className='flex my-5 items-center justify-center'>
      <span className=" text-lg w-2/5">{inputType.label}</span>
      <input
        className={` ${isDisabled ? 'bg-slate-300 opacity-70' : 'bg-slate-100'} px-5 py-3 w-72 rounded-md shadow-xl 
        ${isErrored ? 'border-rose-500' : 'border-slate-500'} border `}
        type={inputType.type}
        placeholder={inputType.placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
      />
    </div>
  )
}

InfoEditInputTag.propTypes = {
  inputType: PropTypes.shape({
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isErrored: PropTypes.bool.isRequired,
  defaultValue: PropTypes.string,
};

export default InfoEditInputTag
