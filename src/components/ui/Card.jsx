import PropTypes from 'prop-types';

export function Card({children, className}){
  return (
    <div className={`bg-zinc-900 p-14 rounded-md ${className}`}>{children}</div>
  )
}

Card.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };