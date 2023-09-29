import PropTypes from 'prop-types'


export function Container({ children, className }) {
  return (
    <div className={`max-w-7xl px-20 mx-auto ${className}`}>
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};


Container.propTypes = {
    children: PropTypes.node,    
  };