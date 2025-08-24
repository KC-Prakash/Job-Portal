import React from "react";
import {Navigate, Outlet,useLocation} from "react-router-dom";

const ProtectedRouter = ({ requiredRole }) => {

    return <Outlet />;
};

export default ProtectedRouter;