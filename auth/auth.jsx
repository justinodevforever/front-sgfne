import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import userAuthicate from "./auth";

const ProtectRouter = ({ children }) => {
  const navigate = useNavigate();
  const authentication = userAuthicate();
  return authentication ? children : <Navigate to={"/login"} />;
};

export default ProtectRouter;
