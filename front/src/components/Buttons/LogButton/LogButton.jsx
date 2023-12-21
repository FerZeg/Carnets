import { PropTypes } from 'prop-types';
import './LogButton.css';
LogButton.propTypes = {
    text: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
}

const url = (() => {
    const params = new URLSearchParams();
    params.append('response_type', 'code')
    params.append('client_id', 'l2bb03j7i3rwqvfys6nwm4f21uqyze')
    params.append('redirect_uri', import.meta.env.VITE_API_URL + '/callback/twitch')
    params.append('scope', 'user:read:follows user:read:subscriptions channel:read:redemptions channel:manage:redemptions channel:read:subscriptions channel:read:vips moderator:read:followers')
    const newUrl = new URL('https://id.twitch.tv/oauth2/authorize');
    newUrl.search = params.toString();
    return newUrl.toString();
})()

export default function LogButton(props) {
    return (
    <a href={url}>
        <button className="login">
            {props.children}
            <span>{props.text}</span>
        </button>
    </a>
    )
}