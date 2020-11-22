import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';
import clsx from 'clsx';

const Button = ({ name, href, className }) => (
  <button className={clsx(className, styles.button) } href={href}>
    { name }
  </button>
);

Button.propTypes = {
  name: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
