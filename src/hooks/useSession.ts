import Session from "@/models/session"
import { revokeSession, setSession } from "@/state/slices/session";
import { RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

const useSession = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state: RootState) => state.session);

    const logout = () => {
        // Dispatch the revokeSession action
        dispatch(revokeSession());
        // Redirect to the login page
        navigate('/login');
    }

    const login = (session: Session) => {
        // Dispatch the setSession action
        dispatch(setSession(session));
        // Redirect to the dashboard or another page
        navigate("/projects");
    }

    return { logout, login, user};
}

export default useSession;