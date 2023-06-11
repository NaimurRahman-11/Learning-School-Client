import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";


const UserDash = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className="container"> 
            <h1>Welcome to Learning School, { user.displayName}!</h1>
        </div>
    );
};

export default UserDash;