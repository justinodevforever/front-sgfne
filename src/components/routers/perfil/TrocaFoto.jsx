import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TrocaFoto.css";
import { BiImage } from "react-icons/bi";
import { apiMultForm } from "../../../../auth/auth";
import { Spin } from "antd";

export default function TrocaFoto() {
  const navigator = useNavigate();
  const [im, setIm] = useState("");
  const [legenda, setLegenda] = useState("");
  const [clic, setClic] = useState(false);
  const [fk_user, setFk_user] = useState(0);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;

  async function hendleAddImage(e) {
    e.preventDefault();
    setClic(true);
    const formDat = new FormData();
    formDat.append("file", file);
    formDat.append("fk_user", fk_user);
    formDat.append("legenda", legenda);

    await apiMultForm
      .post(`${url}/image/user`, formDat)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setClic(false);
      })
      .catch((err) => console.log(err));
    navigator(`/dashboard/comunicado?page=${1}`);
  }

  useState(() => {
    setFk_user(sessionStorage.getItem("id"));
  }, []);

  return (
    <>
      <div className="form-foto">
        <form onSubmit={(e) => hendleAddImage(e)}>
          <h4> Foto do Perfil</h4>
          <div
            style={{
              display: "flex",
              width: "50%",
              justifyContent: "space-between",
              borderRadius: "50%",
            }}
            className="inputFile">
            <div
              className="image"
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
              }}>
              {!file && (
                <img
                  src={`../../../image/emptyImage.jpg`}
                  alt={"image"}
                  width={"90px"}
                  height={"90px"}
                  style={{
                    borderRadius: "50%",
                  }}
                />
              )}
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt={"image"}
                  width={"90px"}
                  height={"90px"}
                  style={{
                    borderRadius: "50%",
                  }}
                />
              )}
            </div>
            <label htmlFor="fileinpt">
              <BiImage size={"100px"} color="00f" cursor={"pointer"} />{" "}
            </label>
          </div>
          <input
            type="file"
            name="file"
            id="fileinpt"
            onChange={(e) => setFile(e.target.files[0])}
            required
            hidden
          />
          <textarea
            placeholder="Escreve a Leganda"
            className="legenda"
            onChange={(e) => setLegenda(e.target.value)}
          />

          {file && (
            <>
              {!clic && <button type="submit">Alterar</button>}
              <Spin spinning={clic} style={{ marginTop: "20px" }} />
            </>
          )}
        </form>
      </div>
    </>
  );
}
