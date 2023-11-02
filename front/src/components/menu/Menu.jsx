import {PropTypes} from 'prop-types';
export default function Menu(props) {
    return (
        <ul>
        {
            props.links.map((link, index) => {
                return (<li key={link.name}><a href={link.url}>{link.name}</a></li>)
            })
        }
        </ul>
    )

}

Menu.propTypes = {
    links: PropTypes.array.isRequired
}