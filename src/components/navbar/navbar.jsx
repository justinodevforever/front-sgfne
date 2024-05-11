import "./navBar.scss";
import { Link } from "react-router-dom";
import "../routers/respossividade.css";
import { useEffect, useRef, useState } from "react";
import {
  BsFillArrowUpRightSquareFill,
  BsMessenger,
  BsOption,
} from "react-icons/bs";
import {
  BiExit,
  BiHome,
  BiSelection,
  BiSolidBellOff,
  BiSolidHome,
} from "react-icons/bi";
import { CiHome } from "react-icons/ci";
import { BiSolidBell } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { api } from "../../../auth/auth";
import { io } from "socket.io-client";
import { GrConsole, GrUnorderedList } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import Logaut from "../routers/login/Logaut";
import { Socket } from "../../socketIO";
import { PiCurrencyCircleDollar, PiStudentBold } from "react-icons/pi";
import { AiFillContacts, AiOutlineSetting } from "react-icons/ai";
import PegarRoles from "../../configs/roles/Roles";
import { useSelector } from "react-redux";
import PegarPermissoes from "../../configs/permissoes/PegarPermissoes";
import MenuPerfil from "./Menu Perfil/MenuPerfil";

function NavBar({ setMostrar, setIsVisible, isVisible, mostrar }) {
  const [nome, setNome] = useState();
  const [image, setImage] = useState([]);
  const [notify, setNotify] = useState([]);
  const [token, setToken] = useState({});
  const [receiveSms, setReceiveSms] = useState(0);
  const [lerNotificacao, setLerNotificacao] = useState(false);
  const [visible, setVisible] = useState(true);
  const [atualizar, setAtualizar] = useState([]);
  const socketInstance = useRef();
  const [socket] = useState(Socket());
  let menuMobile = document.getElementById("menu-mobile");
  const [clic, setClic] = useState(false);
  const [clic1, setClic1] = useState(false);
  const [clic2, setClic2] = useState(false);
  const [clic3, setClic3] = useState(false);
  const { isClic } = useSelector((state) => state.ui.pagou);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL_SOCKET;

  useEffect(() => {
    socketInstance.current = io(`${url}`);
    socket.emit("connectedNotify", sessionStorage.getItem("id"));
    socket.emit("connectedUserNotify", sessionStorage.getItem("id"));
  }, []);

  useEffect(() => {
    const pegarEstudantePorUsuario = async () => {
      await api
        .post("/estudante/user", { fk_user: sessionStorage.getItem("id") })
        .then((data) => {
          if (data.data === "Token Invalid") {
            navigate("/login");
            return;
          }
          if (data.data?.id) {
            socket.emit("sendNotify", data.data.id);
            return;
          }
        });
    };
    pegarEstudantePorUsuario();
  }, [isClic]);

  useEffect(() => {
    socket.on("receivedNotify", (data) => {
      setNotify(data);
    });
  }, [notify]);

  useEffect(() => {
    const messages = async () => {
      await api
        .get(`/getmensagem/${sessionStorage.getItem("id")}`)
        .then((data) => {
          setReceiveSms(data.data.length);
        });
    };
    messages();
  }, []);

  useEffect(() => {
    socket.on("receiverNotify", async (dados) => {
      setAtualizar(dados);
    });
    async function getM() {
      await api
        .get(`/getmensagem/${sessionStorage.getItem("id")}`)
        .then((data) => {
          setReceiveSms(data.data.length);
        })
        .catch((err) => console.log(err));
    }
    getM();
  }, [atualizar]);

  const toggleOpen = () => {
    setMostrar(!mostrar);
  };
  const closedMenu = () => {
    try {
      menuMobile.classList.remove("open");
      setMostrar(false);
    } catch (error) {}
  };

  async function hendleGetImage() {
    await api
      .post("/images/user", {
        fk_user: sessionStorage.getItem("id"),
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setImage(data.data[0]);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    setNome(sessionStorage.getItem("user"));
    hendleGetImage();
  }, []);
  const toggle = (e) => {
    e.preventDefault();
    setIsVisible(true);
  };
  const toggleLerNotificacao = (e) => {
    e.preventDefault();
    setLerNotificacao(!lerNotificacao);
  };

  function MenuOpen(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }
  return (
    <nav className='container-nav'>
      <div className='titlediv'>
        <h3 className='title'>SGFNE</h3>
      </div>
      <div className='pesquisa'></div>

      <ul className='barra-menu'>
        <li className='home focus' onLoad={(e) => toggle(e)}>
          <div className='nos'>
            <Link
              className='home'
              to={`/main/comunicado?page=${1}`}
              title='Página Inicial'>
              <BiSolidHome size={"20px"} className='link-nav' color='a31543' />
            </Link>
          </div>
        </li>

        <li>
          <div className='nos'>
            <Link to={`/chat/${sessionStorage.getItem("id")}`} className='sms'>
              <BsMessenger
                size={"20px"}
                className='link-nav focus'
                color={"a31543"}
                title='Ver Mensagens'
              />
            </Link>
            {Number(receiveSms) > 0 ? (
              <div className='noitifysms'>
                {Number(receiveSms) < 10 ? (
                  <span className='menor'>{receiveSms}</span>
                ) : (
                  <span className='maior'>+10</span>
                )}
              </div>
            ) : null}
          </div>
        </li>

        <li className='focus'>
          <div className='nos'>
            {notify?.length > 0 ? (
              <Link className='notify-li focus' title='Ver Notifições'>
                <BiSolidBell
                  size={"20px"}
                  className='link-nav '
                  color='#a31543'
                  onClick={(e) => toggleLerNotificacao(e)}
                />
              </Link>
            ) : (
              <Link className='notify-li focus' title='Ver Notifições'>
                <BiSolidBellOff
                  size={"20px"}
                  className='link-nav '
                  color='#a31543'
                />
              </Link>
            )}
            {notify?.length > 0 ? (
              <div className='div-noitify'>
                {notify?.length < 10 ? (
                  <span
                    className='menor'
                    onClick={(e) => toggleLerNotificacao(e)}>
                    {notify.length}
                  </span>
                ) : (
                  <span
                    className='maior'
                    onClick={(e) => toggleLerNotificacao(e)}>
                    +10
                  </span>
                )}
              </div>
            ) : null}
          </div>
        </li>
        <li>
          <div className=' botaoMenu'>
            <Link>
              <GrUnorderedList
                size={"20px"}
                color='#a31543'
                onClick={toggleOpen}
                cursor={"pointer"}
                className=' barra link-nav'
                title='Ver o Menu'
              />
            </Link>
          </div>
        </li>
        {lerNotificacao && notify.length >= 1 && (
          <li className='notificacoes'>
            <div>
              {notify.length === 1 ? (
                <p>Estás a Dever o Mês de: </p>
              ) : (
                <p>Estás a Dever os Meses de: </p>
              )}
              {notify?.map((n, index) => (
                <span key={index}>
                  {index + Number(1) + " - "}
                  {n}
                </span>
              ))}
            </div>
          </li>
        )}
      </ul>

      <div className='image'>
        {image == undefined || null || image.length == 0 ? (
          <Link className='perfil img' onClick={(e) => MenuOpen(e)}>
            <img src={`../../../image/emptyImage.jpg`} alt={""} />
          </Link>
        ) : (
          <div>
            <Link className='perfil' onClick={(e) => MenuOpen(e)}>
              <img
                src={`${url}/files/users/${image?.nome}`}
                alt={""}
                className='perfil-image'
              />
            </Link>
          </div>
        )}

        {isOpen && <MenuPerfil />}
      </div>
    </nav>
  );
}

export default NavBar;
