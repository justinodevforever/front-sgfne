import "./principal.css";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../../store/ui-slice";
import { api } from "../../../../auth/auth";

import { AiOutlineSetting } from "react-icons/ai";
import {
  PiCurrencyCircleDollar,
  PiCurrencyDollar,
  PiList,
  PiListBulletsLight,
  PiListChecks,
  PiStudentBold,
} from "react-icons/pi";
import Servicos from "./Services/Servicos";
import {
  HomeFilled,
  HomeOutlined,
  DollarOutlined,
  SettingOutlined,
  MessageFilled,
  BellOutlined,
  MessageOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  DollarCircleFilled,
} from "@ant-design/icons/lib/icons";
import { Menu, Drawer } from "antd";
import { List } from "antd/es/form/Form";
import {
  BiHome,
  BiListMinus,
  BiListOl,
  BiListUl,
  BiSolidDashboard,
} from "react-icons/bi";

const Principal = ({ mostrar, setMostrar }) => {
  const clickRef = useRef();
  const [check, setCheck] = useState(false);
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [user, setUser] = useState("");
  const [clic, setClic] = useState(true);
  const [clic1, setClic1] = useState(false);
  const [clic2, setClic2] = useState(false);
  const [clic4, setClic4] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refPr = useRef();

  const icPR = document.getElementById("icPr");
  const pr = document.getElementById("pro");
  useEffect(() => {
    auth();
  }, []);

  function focus() {
    // if (refPr.current !== undefined) {
    //   pr.style.background = "#000";
    // }

    console.log("djsmd", refPr.current);
  }

  function ToggleModal(e) {
    e.preventDefault();
    dispatch(toggleModal(true));
  }

  async function auth() {
    await api.get(`/user/${sessionStorage.getItem("id")}`).then((data) => {
      if (data.data === "Token Invalid") {
        navigate("/login");
        return;
      }
      setUser(data.data.nome);
    });
  }

  function ToggleMenu(e) {
    e.preventDefault();
    let menu = document.getElementById("menu");

    menu.classList.add("openMenu");
  }
  async function logar(e) {
    e.preventDefault();
    const { data } = await api.post("/logar/professor", {
      nome,
      password,
    });
    if (data.msg !== "password valid") {
      console.log(data.msg);
      return;
    }

    navigate(`/professor/${data.response.id}`);
  }

  useEffect(() => {
    function clickFora(e) {
      let menu = document.getElementById("menu");
      try {
        if (clickRef.current.contains(e.target)) return;

        menu.classList.remove("openMenu");
      } catch (error) {}
    }

    document.addEventListener("mousedown", clickFora);

    return () => {
      document.addEventListener("mousedown", clickFora);
    };
  }, []);

  return (
    <div className='comunicado' id='co'>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          marginTo: "-10px",
        }}>
        <div className='gavetaMenu' id='menu' ref={clickRef}>
          <Link to={"#"} title='Estudantes' id='p' className=''>
            <PiStudentBold color='#fff' size={40} id='icPr' />
          </Link>
          <Drawer
            open={mostrar}
            closable={false}
            placement='left'
            onClose={() => {
              setMostrar(!mostrar);
            }}
            style={{
              height: "100vh",
              width: "200px",
              color: "#a31543",
              justifyItems: "flex-start",
            }}>
            <h3>Menu</h3>
            <Menu
              onClick={({ key }) => {
                navigate(key);
              }}
              mode='inline'
              style={{
                display: "flex",
                flexDirection: "column",
                border: "none",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "justify",
                color: "#a31543",
                // marginLeft: "-20px",
              }}
              items={[
                {
                  label: "Home",
                  key: `comunicado?page=${1}`,
                  icon: <BiHome size={23} />,
                },
                {
                  label: "Painel",
                  key: "/dashboard",
                  icon: <BiSolidDashboard size={23} />,
                },
                {
                  label: "Serviços",
                  icon: <PiCurrencyDollar size={23} />,

                  children: [
                    {
                      label: "Propina",
                      key: "propina",
                    },
                    {
                      label: "Recurso",
                      key: `recurso`,
                    },
                    {
                      label: "Cadeira em Atraso",
                      key: `cadeira?tipos=${"Cadeira em Atrazo"}`,
                    },
                    {
                      label: "Exame Especial",
                      key: `exame especial`,
                    },
                    {
                      label: "Declaração sem Nota",
                      key: `declaracao?tipos=${"semNota"}`,
                    },
                    {
                      label: "Declaração com Nota",
                      key: `declaracao?tipos=${"comNota"}`,
                    },
                    {
                      label: "Declaração Linceciatura",
                      key: `declaracao?tipos=${"linceciatura"}`,
                    },
                    {
                      label: "Rencofirmação",
                      key: `reconfirmacao`,
                    },
                    {
                      label: "Pagamento de Folha",
                    },
                  ],
                },
                {
                  label: "Minhas Solicitções",
                  icon: <PiListChecks size={23} />,
                  key: "minhas solicitacoes",
                },
              ]}
            />
          </Drawer>
          <Link
            to={`servicos`}
            className='Propina'
            id='pro'
            ref={refPr}
            onClick={focus}>
            <PiCurrencyCircleDollar
              color='#fff'
              title='Pagamentos'
              size={40}
              id='icPr'
            />
          </Link>
          <Link to={`/comunicados?page=${1}`}>
            <AiOutlineSetting color='#fff' title='Definições' size={40} />
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Principal;
