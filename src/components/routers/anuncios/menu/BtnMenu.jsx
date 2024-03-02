import Menu from "./Menu";
import { useRef } from "react";

function BtnMenu({ id, nameUser }) {
  const menuRef = useRef();

  return (
    <div className="container-btnmenu">
      <Menu ref={menuRef} id={id} />
    </div>
  );
}
export default BtnMenu;
