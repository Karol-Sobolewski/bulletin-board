import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';
import clsx from 'clsx';

const Button = ({ name, href, className, onClick, ref}) => (
  <button ref={ref} className={clsx(className, styles.button) } href={href} onClick={onClick}>
    { name }
  </button>
);

Button.propTypes = {
  name: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.any,
  ref: PropTypes.any,
};

export default Button;
