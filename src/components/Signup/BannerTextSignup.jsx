import React from 'react'
import PropTypes from "prop-types";
import classNames from 'classnames';


const BannerText = ({isMobile}) => {
  const textSizeClass = classNames({
    'font-k2d': true,
    'text-5xl': !isMobile,
    'text-2xl': isMobile,
    'whitespace-nowrap': true,
  });

  return (
    <div className={textSizeClass}>
      Welcome to JeansCode!
    </div>
  )
}

BannerText.propTypes = {
  isMobile: PropTypes.bool,
};

export default BannerText
