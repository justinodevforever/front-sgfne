import { useEffect, useRef, useState } from "react";
import NavBar from "../../navbar/navbar";
import "./Mensagem.css";
import { useParams, useSearchParams } from "react-router-dom";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { api } from "../../../../auth/auth";
import { BiSolidSend, BiWinkSmile } from "react-icons/bi";
import { io } from "socket.io-client";
import { formaHouser, formatDate } from "../hook/timeout";
import Ispm from "../hook/Ispm";
import { Socket } from "../../../socketIO";
import { Button, Spin } from "antd";
import { SendOutlined } from "@ant-design/icons";

function Mensagem() {
  // const [socketInstance] = useState(Socket());
  const socketInstance = useRef();
  const [messagem, setMessagem] = useState("");
  const [message, setMessage] = useState([]);
  const { id } = useParams();
  const [notifySms, setNotifySms] = useState([]);
  const [isPick, setIsPick] = useState(false);
  const [online, setOnline] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [socket] = useState(Socket());

  const bottonRef = useRef();
  const [contact] = useSearchParams();
  const [sms] = useSearchParams();
  const url = import.meta.env.VITE_API_URL_SOCKET;

  useEffect(() => {
    socketInstance.current = io(`${url}`);
  }, []);

  useEffect(() => {
    socketInstance.current.emit("addUser", sessionStorage.getItem("id"));
    socketInstance.current.on("getUsers", (data) => {
      setOnline(data.filter((user) => user.userId === id));
    });
    socket.emit("connectedNotify", sessionStorage.getItem("id"));
  }, []);

  useEffect(() => {
    socketInstance.current.on("messageReceived", (messege) => {
      if (messege.sendId === id) {
        setMessage([...message, messege]);
        setNotifySms("messege");
      }
    });
  }, [message]);

  useEffect(() => {
    getMensage();
    getMensageNaoLida();
    const userId = sessionStorage.getItem("id");
    socketInstance.current.emit("connected", userId);
  }, []);

  useEffect(() => {
    scrollDown();
  }, [message]);

  const getMensageNaoLida = async () => {
    const notify = {
      sendId: sessionStorage.getItem("id"),
      receiveId: id,
      type: 1,
      contactId: contact.get("contact"),
    };
    await api
      .get(`message/naolida/${sms.get("sms")}`)
      .then(async (data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        if (!data.data) return;

        await api.put(`/updatemensagem/${contact.get("sms")}`, {
          lida: true,
        });

        socket.emit("notifyMessage", notify);
      })
      .catch((err) => console.log(err));
  };
  const getMensage = async () => {
    await api
      .get(`message/${contact.get("contact")}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setMessage(data.data);
      })
      .catch((err) => console.log(err));
  };

  const dataFormatada = (data) => {
    return formatDate(data);
  };
  const hourFomrmat = (data) => {
    return formaHouser(data);
  };
  async function hendleSubmitEnviada(e) {
    e.preventDefault();
    setIsVisible(true);
    const Mensage = {
      sendId: sessionStorage.getItem("id"),
      receiveId: id,
      sms: messagem,
    };
    await api
      .post("message", {
        contactId: contact.get("contact"),
        sendId: sessionStorage.getItem("id"),
        sms: messagem,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        const notify = {
          sendId: sessionStorage.getItem("id"),
          receiveId: id,
          type: 1,
          contactId: contact.get("contact"),
        };
        socketInstance.current.emit("sendMessege", Mensage);
        socket.emit("notifyMessage", notify);

        setMessage([...message, data.data.response]);
        setMessagem("");
        setIsVisible(false);
      })
      .catch((err) => console.log(err));
  }

  const scrollDown = () => {
    bottonRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className='mens'>
      <div className='container-mensagem' id='c'>
        <div className='container-conteudo'>
          <div>
            {message?.map((sms) => (
              <div className='dv' key={sms?.id}>
                <span className='spanDate'>
                  {dataFormatada(sms?.createdAt)}
                </span>
                <div
                  className={
                    sms?.sendId === sessionStorage.getItem("id")
                      ? "send"
                      : "receive"
                  }>
                  <ul>
                    <li>{sms?.sms}</li>
                    <span className='spanHour'>
                      {sms?.sendId === sessionStorage.getItem("id") ? (
                        <p>Eu:</p>
                      ) : (
                        <p></p>
                      )}
                      {hourFomrmat(sms?.createdAt)}
                    </span>
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div ref={bottonRef} />
        </div>

        <form>
          <textarea
            type='text'
            value={messagem}
            onChange={(e) => {
              setMessagem(e.target.value);
            }}
            id='sms'
            placeholder='Enviar Mensagem'
            required
          />

          <div className='imojiMessage'>
            <BiWinkSmile
              cursor={"pointer"}
              size={"30px"}
              color='#fff'
              onClick={() => {
                setIsPick(!isPick);
              }}
            />

            <div className={isPick ? "abrirEmoji" : "feicharEmoji"}>
              <Picker
                width='40px'
                size='20px'
                data={data}
                previewPosition='fixed'
                onEmojiSelect={(e) => {
                  setMessagem(messagem + e.native);
                }}
                className='emoji'
              />
            </div>
          </div>

          {messagem && (
            <div className='divEnviar'>
              <Button
                icon={<SendOutlined />}
                type='primary'
                loading={isVisible}
                style={{
                  textAlign: "center",
                  marginLeft: "10px",
                }}
                onClick={(e) => {
                  hendleSubmitEnviada(e);
                }}
                color='00f'
                size={25}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Mensagem;
