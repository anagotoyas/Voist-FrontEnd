import {PropTypes} from 'prop-types'

export function Label({ children, htmlFor }) {
  return (
    <label
      className="block text-sm font-medium text-gray-400"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}

export default Label;

Label.propTypes = {
    children: PropTypes.node,
    htmlFor: PropTypes.node,
    
  };