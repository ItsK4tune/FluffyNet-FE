import { env } from '../../libs';

export const google = () => {
    window.location.href = `${env.be.url}/api/auth/google`;
};