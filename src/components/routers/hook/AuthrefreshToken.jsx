import { useState } from "react";
import { api, apiFr } from "../../../../auth/auth";

export const refreshToken = async () => {
  const { data } = await api.post("/refresh", {
    refreshToken: localStorage.getItem("refreshToken"),
  });

  if (data === "Token Invalid") {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("token");
    return;
  }
  localStorage.setItem("token", data);

  return data;
};
