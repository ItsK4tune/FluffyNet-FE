import { env } from '../../libs';
import { useNavigate } from 'react-router-dom';

export const google = () => {
    const navigate = useNavigate();
    navigate(`${env.be.url}/api/auth/google`);
};