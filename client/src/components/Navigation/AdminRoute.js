import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const AdminRoute = ({ component: Component, ...rest }) => {

    const userLogin = useSelector(state => state?.users.userAuth);
    return (
        <Route
            {...rest}
            render={() =>
                userLogin ? <Component {...rest} /> : <Navigate to="/login" />
            }
        />
    );
};

export default AdminRoute;