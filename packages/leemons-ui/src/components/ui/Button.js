import React from 'react';
import PropTypes from 'prop-types';

const Button = React.forwardRef(
  (
    {
      children,
      className,
      color,
      rounded,
      outlined,
      wide,
      loading,
      square,
      circle,
      link,
      disableOnLoading,
      text,
      type,
      ...props
    },
    ref
  ) => {
    const classes = className || '';
    const roundClass = rounded ? 'rounded-full' : '';
    const colorClass = color ? `btn-${color}` : '';
    const outlinedClass = outlined ? 'btn-outline' : '';
    const wideClass = wide ? 'btn-wide' : '';
    const loadingClass = loading ? 'loading' : '';
    const squareClass = square ? 'btn-square' : '';
    const circleClass = circle ? 'btn-circle' : '';
    const linkClass = link ? 'btn-link' : '';
    const textClass = text ? 'btn-text' : '';
    const disableClass = loading && disableOnLoading ? 'pointer-events-none' : '';

    const allClasses = [
      'btn',
      outlinedClass,
      colorClass,
      wideClass,
      roundClass,
      loadingClass,
      squareClass,
      circleClass,
      linkClass,
      classes,
      disableClass,
      textClass,
    ].join(' ');

    if (type === 'button') {
      return (
        <button ref={ref} className={allClasses} {...props}>
          {children}
        </button>
      );
    }

    if (type === 'link') {
      return (
        <a ref={ref} className={allClasses} {...props}>
          {children}
        </a>
      );
    }

    return (
      <div ref={ref} className={allClasses} {...props}>
        {children}
      </div>
    );
  }
);

Button.displayName = 'Button';
Button.defaultProps = { disableOnLoading: true, type: 'button' };

Button.propTypes = {
  children: PropTypes.any,
  reference: PropTypes.any,
  wide: PropTypes.bool,
  loading: PropTypes.bool,
  square: PropTypes.bool,
  circle: PropTypes.bool,
  link: PropTypes.bool,
  className: PropTypes.string,
  rounded: PropTypes.bool,
  outlined: PropTypes.bool,
  disableOnLoading: PropTypes.bool,
  text: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'link']),
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'accent',
    'info',
    'warning',
    'success',
    'error',
    'ghost',
  ]),
};

export default Button;