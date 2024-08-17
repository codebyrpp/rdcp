import User from "./user";

interface Session{
    user: User;
    token: string;
}

export default Session;