import User from './User';

type AuthenticatedUser = {
    email: string | null;
    language: string | null;
} & User;

export default AuthenticatedUser;
