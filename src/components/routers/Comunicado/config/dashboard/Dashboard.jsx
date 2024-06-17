import "./dashboard.scss";
import { useEffect, useState } from "react";
import { api } from "../../../../../../auth/auth";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import imageLogo from "./Logo.png";
import {
  AppRegistrationRounded,
  DashboardOutlined,
  Home,
  HomeMaxOutlined,
  Payment,
  PowerOff,
  PrintRounded,
  Settings,
  SettingsInputAntennaRounded,
} from "@mui/icons-material";
import DadosMenu from "./dadosMenu/DadosMenu";
import { PiStudentBold } from "react-icons/pi";
import { DashboardFilled } from "@ant-design/icons";
import MenuRelatorio from "./dadosMenu/MenuRelatorios/MenuRelatorio";
import MenuEstudante from "./dadosMenu/MenuEstudante/MenuEstudante";
import MenuConfig from "./dadosMenu/MenuConfig/MenuConfig";
import { Input } from "antd";
import imageUser from "./emptyImage.jpg";
import MenuPerfil from "../../../../navbar/Menu Perfil/MenuPerfil";
import { CiLogout } from "react-icons/ci";
import MenuCadastro from "./MenuCadastro/MenuCadastro";

const Dashboard = () => {
  const [isClosed, setIsClosed] = useState(false);
  const [register, setRegister] = useState(false);
  const [printer, setPrinter] = useState(false);
  const [config, setConfig] = useState(false);
  const [pay, setPay] = useState(false);
  const [student, setstudent] = useState(false);
  const [cadastro, setCadastro] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dash, setDash] = useState(false);
  const [image, setImage] = useState([]);
  const [admin, setAdmin] = useState({});
  const navigate = useNavigate();
  const id = useParams();

  useEffect(() => {
    hendleGetUserPermissio();
    hendleGetImage();
    varify();
  }, []);
  useEffect(() => {
    varify();
  }, [id]);
  const hendleGetUserPermissio = async () => {
    await api
      .get("/permissaousuario")
      .then((data) => {
        if (data.data === "Token Invalid") {
          return navigate("/login");
        }
        if (data.data) {
          const admin = data.data.filter(
            (perm) => perm.permission.permissao === "admin"
          );
          setAdmin(admin[0]);
        }
      })
      .catch((error) => console.log(error));
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
  function logaut(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("user");
    navigate("/login");
  }

  const varify = () => {
    if (Number(id.id) === Number(1)) {
      setDash(true);
      setPay(false);
      setPrinter(false);
      setRegister(false);
      setConfig(false);
      setstudent(false);
      return;
    } else if (Number(id.id) === Number(2)) {
      setPay(true);
      setDash(false);
      setPrinter(false);
      setRegister(false);
      setConfig(false);
      setstudent(false);
      return;
    } else if (Number(id.id) === Number(3)) {
      setRegister(true);
      setPay(false);
      setPrinter(false);
      setDash(false);
      setConfig(false);
      setstudent(false);
      return;
    } else if (Number(id.id) === Number(4)) {
      setPrinter(true);
      setPay(false);
      setDash(false);
      setRegister(false);
      setConfig(false);
      setstudent(false);
      return;
    } else if (Number(id.id) === Number(5)) {
      setstudent(true);
      setPay(false);
      setPrinter(false);
      setRegister(false);
      setConfig(false);
      setDash(false);
      return;
    } else if (Number(id.id) === Number(6)) {
      setConfig(true);
      setPay(false);
      setPrinter(false);
      setRegister(false);
      setDash(false);
      setstudent(false);
      return;
    }
  };

  return (
    <div className='containerDashboard'>
      <div className={!dash ? "menu" : "offBorder"}>
        <div
          className='user'
          style={{
            color: "#fff",
            background: "#000",
            padding: "0px",
          }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#fff",
              background: "#000",
              marginBottom: "10px",
            }}>
            <img src={imageLogo} alt='image' />
            <h3
              style={{
                margin: "15px 10px 0px 0px",
              }}>
              SGF
            </h3>
            <CiLogout
              style={{
                margin: "15px 10px 0px 0px",
                transform: "rotate(180deg)",
              }}
              size={25}
              color='red'
              onClick={(e) => {
                logaut(e);
              }}
              cursor={"pointer"}
            />
          </div>
          <div
            className='opcoes'
            style={{
              color: "#fff",
              padding: "0px",
            }}>
            <div className={dash ? "isDash" : "offDash"}>
              <DashboardOutlined
                cursor={"pointer"}
                onClick={() => {
                  setDash(true);
                  setPay(false);
                  setPrinter(false);
                  setRegister(false);
                  setConfig(false);
                  setstudent(false);
                  navigate(`/dashboard/dados/${1}`);
                }}
              />
            </div>
            <div className={pay ? "isPay" : "offPay"}>
              <Payment
                cursor={"pointer"}
                onClick={() => {
                  setPay(true);
                  setPrinter(false);
                  setRegister(false);
                  setConfig(false);
                  setstudent(false);
                  setDash(false);
                }}
              />
            </div>
            <div className={register ? "isRegiter" : "offRegiter"}>
              <AppRegistrationRounded
                cursor={"pointer"}
                onClick={() => {
                  setRegister(true);
                  setPrinter(false);
                  setPay(false);
                  setConfig(false);
                  setstudent(false);
                  setDash(false);
                }}
              />
            </div>
            <div className={printer ? "isPrinter" : "offPrinter"}>
              <PrintRounded
                cursor={"pointer"}
                onClick={() => {
                  setPrinter(true);
                  setRegister(false);
                  setPay(false);
                  setConfig(false);
                  setstudent(false);
                }}
              />
            </div>
            <div className={student ? "isStudent" : "offStudent"}>
              <PiStudentBold
                size={25}
                cursor={"pointer"}
                onClick={() => {
                  setstudent(true);
                  setConfig(false);
                  setPay(false);
                  setPrinter(false);
                  setRegister(false);
                  setDash(false);
                }}
              />
            </div>
            <div className={config || id === 6 ? "isConfig" : "offConfig"}>
              <Settings
                cursor={"pointer"}
                onClick={() => {
                  setConfig(true);
                  setPay(false);
                  setPrinter(false);
                  setRegister(false);
                  setstudent(false);
                  setDash(false);
                }}
              />
            </div>
          </div>
        </div>
        <div className='ul'>
          <DadosMenu pay={pay} />
          <MenuRelatorio printer={printer} />
          <MenuEstudante studente={student} />
          <MenuConfig config={config} />
          <MenuCadastro register={register} />
        </div>
      </div>

      <div className='main'>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "40px",
            overflowY: "auto",
          }}>
          <div className='navBar'>
            <ul
              style={{
                display: "flex",
                flexDirection: "row",
                width: "90%",
                justifyContent: "space-between",
              }}>
              <li>
                <Input.Search
                  height={20}
                  placeholder='Digite o Mês'
                  style={{ height: "20px" }}
                />
              </li>
              <li>
                {image == undefined || null || image.length == 0 ? (
                  <Link
                    className='perfil img'
                    to={`/perfil/${sessionStorage.getItem("id")}`}>
                    <img
                      src={`../../../image/emptyImage.jpg`}
                      alt={""}
                      className='userImage'
                    />
                  </Link>
                ) : (
                  <div>
                    <Link
                      className='perfil'
                      to={`/perfil/${sessionStorage.getItem("id")}`}>
                      <img src={image?.nome} alt={""} className='suserImage' />
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
