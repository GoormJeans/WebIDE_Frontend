import React from 'react'
import PropTypes from 'prop-types';
import { InputTagProps } from '../../types/Input.type';

const InfoEditInputTag: React.FC<InputTagProps> = ({ inputType, value, onChange }) => {
  return (
    <div className='flex mt-5 items-center justify-center'>
      <span className="font-k2d text-lg w-40">{inputType.label}</span>
      <input
        className="font-k2d bg-slate-300 px-5 py-3 w-72 rounded-xl shadow-xl"
        type={inputType.type}
        placeholder={inputType.placeholder}
        value={value}
        onChange={onChange}
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
};

export default InfoEditInputTag
