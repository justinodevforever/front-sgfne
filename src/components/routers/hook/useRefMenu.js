import { useState } from "react";

const useRefMenu = () => {
  const [mostrar, setMostrar] = useState(false);
  const toggleMenu = () => {
    setMostrar(!mostrar);
  };

  return [toggleMenu, mostrar, setMostrar];
};

export default useRefMenu;
