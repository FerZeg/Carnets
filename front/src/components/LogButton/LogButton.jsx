import { PropTypes } from 'prop-types';
import './logButton.css';
LogButton.propTypes = {
    text: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
}

export default function LogButton(props) {
    return (
    <button className="button">
        {props.children}
        {props.text}
    </button>
    )
}