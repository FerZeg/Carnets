import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('jwt');
        navigate('/login');
    });
    return (<>Logout</>);
}
