import './ActionButton.css';
import PropTypes from 'prop-types';

const ActionButton = ({ children, className, ...otherProps }) => (
    <button {...otherProps} className={`ActionButton ${className}`}>
        {children}
    </button>
)

ActionButton.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}

export { ActionButton }