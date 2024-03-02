import { useEffect, useRef, useState } from "react";
import NavBar from "../../navbar/navbar";
import "./Mensagem.css";
import { useParams, useSearchParams } from "react-router-dom";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { api } from "../../../../auth/auth";
import { BiWinkSmile } from "react-icons/bi";
import { io } from "socket.io-client";
import { formaHouser, formatDate } from "../hook/timeout";
import Ispm from "../hook/Ispm";
import { Socket } from "../../../socketIO";

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
      if (Number(messege.sendId) === Number(id)) {
        setMessage([...message, messege]);
        setNotifySms(messege);
      }
    });
  }, [message]);

  useEffect(() => {
    getMensage();

    const userId = sessionStorage.getItem("id");
    socketInstance.current.emit("connected", userId);
  }, []);

  useEffect(() => {
    scrollDown();
  }, [message]);

  const getMensage = async () => {
    const notify = {
      sendId: sessionStorage.getItem("id"),
      receiveId: id,
      type: 1,
      contactId: contact.get("contact"),
    };
    await api
      .get(`message/${contact.get("contact")}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        const dados = data.data.filter(
          (m) =>
            m.lida === false &&
            m.sendId !== Number(sessionStorage.getItem("id"))
        );

        dados.map(async (m) => {
          await api.put(`/updatemensagem/${m.id}`, {
            sms: m.sms,
            lida: true,
          });

          socket.emit("notifyMessage", notify);
        });
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

    const Mensage = {
      sendId: sessionStorage.getItem("id"),
      receiveId: id,
      sms: messagem,
      createdAt: Date.now(),
    };
    await api
      .post("message", {
        contactId: contact.get("contact"),
        sendId: sessionStorage.getItem("id"),
        sms: messagem,
        createdAt: Mensage.createdAt,
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
      })
      .catch((err) => console.log(err));
  }

  const scrollDown = () => {
    bottonRef.current.scrollIntoView({ behavior: "smooth" });
  };
  if (isVisible) {
    const c = document.getElementById("c");
    c?.classList.add("opacity");
  }

  return (
    <div className="mens">
      {isVisible && <Ispm />}
      <div className="container-mensagem" id="c">
        {/* <OnlineUser online={online} /> */}
        <div className="container-conteudo">
          <div>
            {message.map((sms, index) => (
              <div className="dv" key={index}>
                <span className="spanDate">{dataFormatada(sms.createdAt)}</span>
                <div
                  className={
                    sms.sendId === Number(sessionStorage.getItem("id"))
                      ? "send"
                      : "receive"
                  }>
                  <ul>
                    <li>{sms.sms}</li>
                    <span className="spanHour">
                      {sms.sendId === Number(sessionStorage.getItem("id")) ? (
                        <p>Eu:</p>
                      ) : (
                        <p></p>
                      )}
                      {hourFomrmat(sms.createdAt)}
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
            type="text"
            value={messagem}
            onChange={(e) => {
              setMessagem(e.target.value);
            }}
            id="sms"
            placeholder="Enviar Mensagem"
            required
          />

          <div className="imojiMessage">
            <BiWinkSmile
              cursor={"pointer"}
              size={"30px"}
              color="#fff"
              onClick={() => {
                setIsPick(!isPick);
              }}
            />

            <div className={isPick ? "abrirEmoji" : "feicharEmoji"}>
              <Picker
                width="40px"
                size="20px"
                data={data}
                previewPosition="fixed"
                onEmojiSelect={(e) => {
                  setMessagem(messagem + e.native);
                }}
                className="emoji"
              />
            </div>
          </div>

          {messagem && (
            <button
              type="submit"
              onClick={(e) => {
                hendleSubmitEnviada(e);
              }}>
              Enviar
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Mensagem;
