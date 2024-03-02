import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TrocaFoto.css";
import { BiImage } from "react-icons/bi";
import { apiMultForm } from "../../../../auth/auth";

export default function TrocaFoto() {
  const navigator = useNavigate();
  const [im, setIm] = useState("");
  const [legenda, setLegenda] = useState("");
  const [fk_user, setFk_user] = useState(0);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  async function hendleAddImage(e) {
    e.preventDefault();

    const formDat = new FormData();
    formDat.append("file", file);
    formDat.append("fk_user", fk_user);
    formDat.append("legenda", legenda);

    await apiMultForm
      .post("http://localhost:3001/image/user", formDat)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
      })
      .catch((err) => console.log(err));
    navigator(`/comunicado?page=${1}`);
  }

  useState(() => {
    setFk_user(sessionStorage.getItem("id"));
  }, []);

  return (
    <>
      <div className="form-foto">
        <form onSubmit={(e) => hendleAddImage(e)}>
          <h1>Altera a tua Foto do Perfil</h1>
          <label htmlFor="fileinpt">
            <BiImage size={"100px"} color="00f" cursor={"pointer"} />{" "}
          </label>
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

          <button type="submit">Alterar a Foto</button>
        </form>
      </div>
    </>
  );
}
