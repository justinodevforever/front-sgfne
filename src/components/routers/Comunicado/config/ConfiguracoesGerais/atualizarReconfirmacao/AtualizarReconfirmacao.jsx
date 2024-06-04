import { useEffect, useState } from "react";
import "./atualizarReconfirmacao.scss";
import { api } from "../../../../../../../auth/auth";
import { BiEdit, BiSearch, BiX } from "react-icons/bi";
import UseRemoverConfirm from "./remover/UseRemoverConfirm";
import EditarPropina from "./editar/Editar";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalEdit } from "../../../../../../store/ui-slice";
import PegarPermissoes from "../../../../../../configs/permissoes/PegarPermissoes";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";

const AtualizarReconfirmacao = () => {
  const [isClick, setIsClick] = useState(false);
  const [isClickEdit, setIsClickEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [frequencias, setFrequencias] = useState([]);
  const [anos, setAnos] = useState([]);
  const [semestres, setSemestres] = useState([]);
  const [frequencia, setFrequencia] = useState("");
  const [semestre, setSemestre] = useState("");
  const [ano, setAno] = useState("");
  const [id, setId] = useState("");
  const [bi, setBi] = useState("");
  const [sms, setSms] = useState("");
  const { isVisible } = useSelector((state) => state.ui.ModalEdit);
  const dispatch = useDispatch();
  const [reconfirmacoes, setReconfirmacoes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getFrequencia();
    getAnoLetivo();
    getSemestre();
  }, []);

  const getSemestre = async () => {
    await api
      .get("/semestre")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setSemestre(data.data[0].mes);
        setSemestres(data.data);
      })
      .catch((err) => console.log(err));
  };
  const getFrequencia = async () => {
    await api
      .get("/ano")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setFrequencia(data.data[0].mes);
        setFrequencias(data.data);
      })
      .catch((err) => console.log(err));
  };

  const getAnoLetivo = async () => {
    await api
      .get("/letivo")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setAnos(data.data);
        setAno(data.data[0].ano);
      })
      .catch((err) => console.log(err));
  };
  const buscaReconfirmacao = async () => {
    if (
      !frequencia ||
      !ano ||
      !bi ||
      frequencia === "Escolha" ||
      semestre === "Escolha" ||
      ano === "Escolha"
    ) {
      alert("Existe um Campo Vazio!");
      return;
    }
    setLoading(true);
    await api
      .post("/reconfirmacao/atualizacao", {
        frequencia,
        bi,
        ano,
        semestre,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setLoading(false);
        if (data.data) {
          setReconfirmacoes(data.data);
          setId(data.data.id);
        }
        if (!data.data) {
          alert(`Não existe nenhuma reconfirmção com esses dados`);
          setReconfirmacoes([]);
        }
      })
      .catch((err) => console.log(err));
  };

  function deletePropina(e) {
    e.preventDefault();
    setIsClick(true);
  }
  function editarPropina(e) {
    e.preventDefault();
    dispatch(toggleModalEdit(!isVisible));
  }
  return (
    <>
      {isClick && <UseRemoverConfirm id={id} setIsClick={setIsClick} />}
      <EditarPropina propinas={reconfirmacoes} />
      <div className='atualizarReconfirmacao'>
        <div className='opcoes'>
          <form className='formBi'>
            <div className='cc'>
              <select
                onChange={(e) => setAno(e.target.value)}
                style={{
                  width: "300px",
                  borderRadius: "5px",
                  height: "50px",
                  fontWeight: "200",
                  fontSize: "20px",
                  border: "1px solid #ddd",
                }}>
                <option value='Escolha'>Ano Lectivo</option>

                {anos.map((ano) => (
                  <option value={ano.ano} key={ano.id}>
                    {ano.ano}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => setFrequencia(e.target.value)}
                style={{
                  width: "300px",
                  borderRadius: "5px",
                  height: "50px",
                  fontWeight: "200",
                  fontSize: "20px",
                  border: "1px solid #ddd",
                }}>
                <option value='Escolha'>Ano de Frequência</option>
                {frequencias.map((m) => (
                  <option value={m.ano} key={m.id}>
                    {m.ano}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => setSemestre(e.target.value)}
                style={{
                  width: "300px",
                  borderRadius: "5px",
                  height: "50px",
                  fontWeight: "200",
                  fontSize: "20px",
                  border: "1px solid #ddd",
                }}>
                <option value='Escolha'>Semestre</option>

                {semestres.map((s) => (
                  <option value={s.nome} key={s.id}>
                    {s.nome}
                  </option>
                ))}
              </select>
            </div>
          </form>
          <form className='form' onSubmitCapture={() => buscaReconfirmacao()}>
            <div style={{ marginTop: "10px" }}>
              <Input.Search
                placeholder='Número de BI do Estudante'
                onChange={(e) => setBi(e.target.value)}
                value={bi}
                autoFocus
                maxLength={14}
                onSearch={() => buscaReconfirmacao()}
                loading={loading}
                style={{ width: "70%" }}
              />
            </div>
            <hr
              style={{
                marginTop: "30px",
              }}
            />

            {reconfirmacoes?.estudante?.nome && (
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>B.I</th>
                    <th>Semestre</th>
                    <th>Frequência</th>
                    <th>Ano Letivo</th>
                    <PegarPermissoes
                      permissoes={["admin", "remover", "edição"]}>
                      <th colSpan={2}>Opções</th>
                    </PegarPermissoes>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{reconfirmacoes?.estudante?.nome}</td>
                    <td>{reconfirmacoes?.estudante?.bi}</td>
                    <td>{reconfirmacoes?.semestre.nome}</td>
                    <td>{reconfirmacoes?.frequencia.ano} Ano</td>
                    <td>{reconfirmacoes?.anoLectivo?.ano}</td>
                    <PegarPermissoes permissoes={["admin", "edição"]}>
                      <td>
                        <BiEdit
                          title='Editar Este Mês'
                          cursor={"pointer"}
                          color='blue'
                          onClick={(e) => editarPropina(e)}
                        />
                      </td>
                    </PegarPermissoes>
                    <PegarPermissoes permissoes={["admin", "remover"]}>
                      <td>
                        <BiX
                          title='Eliminar Este Mês'
                          color='red'
                          cursor={"pointer"}
                          size={20}
                          onClick={(e) => deletePropina(e)}
                        />
                      </td>
                    </PegarPermissoes>
                  </tr>
                </tbody>
              </table>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AtualizarReconfirmacao;
