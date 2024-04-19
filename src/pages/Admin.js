import { useLocation } from "react-router-dom";

const Admin = () => {
    const location = useLocation()
    console.log('location admin: ', location)

    return <div>Admin</div>;
};

export default Admin;
