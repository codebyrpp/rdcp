import User from "./user";

interface Session{
    user: User;
    accessToken: string;
    refreshToken: string;
}

export default Session;