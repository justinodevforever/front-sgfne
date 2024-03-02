import { useEffect, useState } from "react";
import "./onlineUser.css";
import { api } from "../../../../auth/auth";

export const OnlineUser = ({ online }) => {
  return (
    <div className="containeOnlineUser">
      <div className="content-online">
        {online.length === 0 ? (
          <span>Está Offline</span>
        ) : (
          <>
            <span>Está Online</span>
            <div className="online"></div>
          </>
        )}
      </div>
    </div>
  );
};
