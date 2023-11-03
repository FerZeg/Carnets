import { PropTypes } from 'prop-types';
import './logButton.css';
LogButton.propTypes = {
    text: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
}

export default function LogButton(props) {
    return (
    <a href="https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=l2bb03j7i3rwqvfys6nwm4f21uqyze&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fcallback%2Ftwitch&scope=user%3Aread%3Afollows+user%3Aread%3Asubscriptions+channel%3Aread%3Aredemptions+channel%3Amanage%3Aredemptions+channel%3Aread%3Asubscriptions+channel%3Aread%3Avips+moderator%3Aread%3Afollowers">
        <button className="login">
            {props.children}
            <span>{props.text}</span>
        </button>
    </a>
    )
}