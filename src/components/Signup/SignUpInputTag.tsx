import React from 'react'
import PropTypes from 'prop-types';
import { InputTagProps } from '../../types/Input.type';

const SignUpInputTag: React.FC<InputTagProps> = ({ inputType, value, onChange }) => {
  return (
    <>
      <span className="font-k2d text-lg">{inputType.label}</span>
      <input
        className="font-k2d bg-slate-300 px-5 py-3 w-72 rounded-xl shadow-xl"
        type={inputType.type}
        placeholder={inputType.placeholder}
        value={value}
        onChange={onChange}
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
};

export default SignUpInputTag
