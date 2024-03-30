import { useState } from "react";
import Loader from "../routers/hook/load/Loader";
import "./estudo.scss";
import { Button, Input, Slider, Drawer, Popconfirm, Modal, Alert } from "antd";
import { Link } from "react-router-dom";
import { BiMenu, BiUser } from "react-icons/bi";

const Estudos = () => {
  const [isC, setIsC] = useState(false);
  const [me, setMe] = useState(false);
  const [val, setVal] = useState(0);

  const p = (e) => {
    e.preventDefault();
    setIsC(true);
    let l;

    l = setTimeout(() => {
      setIsC(false);
      clearTimeout(l);
    }, 3000);
  };
  const menu = (e) => {
    e.preventDefault();
    setMe(!me);
  };
  return (
    <div className="main">
      <div className="nav">
        <BiMenu
          color="000"
          size={27}
          onClick={(e) => menu(e)}
          cursor={"pointer"}
        />
      </div>
      {/* <Popconfirm arrow open /> */}
      {/* <Modal arrow open>
        <h1>Comprar</h1>
      </Modal> */}

      <Drawer open={me} zIndex={1} width={300} height={400}>
        <Link>Nome</Link>
      </Drawer>
      <div className="c">
        <div className="divInf">
          {isC && (
            <Alert
              showIcon
              description="Salvo Com Sucesso"
              type="success"
              className="inf"
            />
          )}

          <Input
            placeholder="dkdkd"
            type="email"
            variant="outlined"
            slot="append">
            {/* <BiUser /> */}
          </Input>
        </div>

        <Button size="100" className="inp" onClick={(e) => p(e)}>
          Cadastrar
        </Button>
      </div>
    </div>
  );
};

export default Estudos;
