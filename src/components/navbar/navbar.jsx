import "./navBar.scss";
import { Link } from "react-router-dom";
import "../routers/respossividade.css";
import { useEffect, useRef, useState } from "react";
import { BsMessenger } from "react-icons/bs";
import {
  BiMenu,
  BiSolidBellOff,
  BiSolidDashboard,
  BiSolidHome,
} from "react-icons/bi";
import { BiSolidBell } from "react-icons/bi";
import { api } from "../../../auth/auth";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { Socket } from "../../socketIO";
import { useSelector } from "react-redux";
import PegarPermissoes from "../../configs/permissoes/PegarPermissoes";
import MenuPerfil from "./Menu Perfil/MenuPerfil";
import imageLogo from "./Logo.png";

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
      <div className='bDashbord'>
        <ul className='barra-menu'>
          {image == undefined || null || image.length == 0 ? (
            <Link className='perfil img' onClick={(e) => MenuOpen(e)}>
              <img src={`../../../image/emptyImage.jpg`} alt={""} />
            </Link>
          ) : (
            <div>
              <Link className='perfil' onClick={(e) => MenuOpen(e)}>
                <img src={image?.nome} alt={""} className='perfil-image' />
              </Link>
            </div>
          )}

          {isOpen && <MenuPerfil />}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
