import React from 'react'
import PropTypes from 'prop-types';
import { InputTagProps } from '../../types/Input.type';

const SignUpInputTag: React.FC<InputTagProps> = ({ inputType, value, onChange, isErrored, disabled }) => {
  const inputClassName = ` bg-slate-300 px-5 py-3 w-72 rounded-xl shadow-xl border-2 ${isErrored ? 'border-rose-500' : ''} `;
  return (
    <>
      <span className=" text-lg mt-2">{inputType.label}</span>
      <input
        className={inputClassName}
        type={inputType.type}
        placeholder={inputType.placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </>
  )
}

SignUpInputTag.propTypes = {
  inputType: PropTypes.shape({
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isErrored: PropTypes.bool.isRequired,
};

export default SignUpInputTag
