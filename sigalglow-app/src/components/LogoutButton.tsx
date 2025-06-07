import { useNavigate } from "react-router-dom";
import { clearToken } from "../models/apiClient";

export function LogoutButton(){
    const navigate = useNavigate();

    function logout() {
        clearToken();
        navigate("/");
    }

    return <button onClick={logout}>Logout</button>
}