import PropTypes from 'prop-types';

export function Card({children, className}){
  return (
    <div className={`bg-white p-14 rounded-md border border-lg ${className} w-[90%] md:w-[60%]`}>{children}</div>
  )
}

Card.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };