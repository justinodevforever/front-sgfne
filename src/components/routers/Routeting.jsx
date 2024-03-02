import { BrowserRouter, Route, Routes, redirect } from "react-router-dom";

//My page
import Home from "./Home.jsx";
import CadastrarUsuario from "../routers/login/cadastrarUsuario.jsx";
import Login from "../routers/login/Login.jsx";

import Mensagem from "../routers/messagens/Mensagem.jsx";
import Perfil from "../routers/perfil/Perfil.jsx";

import Fotos from "../routers/perfil/fotos.jsx";
import TrocaFoto from "../routers/perfil/TrocaFoto.jsx";
import Notificacao from "../routers/notiificacao/Notificacao.jsx";
import ProtectRouter from "../../../auth/auth.jsx";
import Chat from "../routers/messagens/Chat.jsx";
import CriarPagina from "../page/CriarPagina.jsx";
import Pagina from "../page/Pagina.jsx";
import PublicacarPagina from "../page/PublicacaoPagina.jsx";
import TodasPaginas from "../page/TodasPaginas.jsx";
import ComentPublicationPage from "../page/coment/ComentPublicationPage.jsx";
import EditComentPage from "../page/coment/EditComentPage.jsx";
import EdiatrPublicacaoPagina from "../page/EditarPublicacaoPagina.jsx";
import SearchPage from "./search/SearchPage.jsx";
import { Search } from "./search/Search.jsx";
import LerComentarioPublicacao from "./comentarios/LerComentarioPublicacao.jsx";
import EditarComentarioPublicacao from "./comentarios/EditarComentarioPublicacao.jsx";
import Publicar from "./anuncios/publicar.jsx";
import SearchUser from "./search/SearchUser.jsx";
import EditarComunicado from "./Comunicado/editarcomunicado.jsx";
import Lesson from "../lesson/Lesson.jsx";
import Declaracoes from "./Comunicado/Declaracoes.jsx";
import EditarPublicacaoPerfil from "./perfil/EditarPublicacaoPerfil.jsx";
import { EditarPublicacao } from "./anuncios/Editarpublicacao.jsx";
import Cursos from "./Comunicado/scool/cursos/Cursos.jsx";
import Professor from "./Comunicado/Professor/Professor.jsx";
import AnoCurso from "./Comunicado/scool/ano/AnoCurso.jsx";
import Disciplina from "./Comunicado/scool/disciplina/Disciplina.jsx";
import Ispm from "./hook/Ispm.jsx";
import Servicos from "./Comunicado/Services/Servicos.jsx";
import Principal from "./Comunicado/Principal.jsx";
import RelatorioPropina from "./Comunicado/Services/relatorios/propina/Propina.jsx";
import Publicacao from "./anuncios/publicacao.jsx";
import Estudante from "./Comunicado/estudante/Estudante.jsx";
import Propina from "./Comunicado/Services/propinas/Propinas.jsx";
import MenuPagamento from "./Comunicado/Services/menu pagamentos/MenuPagamento.jsx";
import Definicoes from "./Comunicado/config/Definicoes.jsx";

const Routeting = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />

        <Route
          exact
          path="/"
          element={
            <ProtectRouter>
              <Home />
            </ProtectRouter>
          }>
          <Route
            exact
            path="mensagem/:id"
            element={
              <ProtectRouter>
                <Mensagem />
              </ProtectRouter>
            }
            loader={<Ispm />}
          />
          <Route
            path="comunicado"
            element={
              <ProtectRouter>
                <Publicacao />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path="servicos"
            element={
              <ProtectRouter>
                <Servicos />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path="definicoes"
            element={
              <ProtectRouter roles={"admin"}>
                <Definicoes />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path="estudante"
            element={
              <ProtectRouter roles={"user"}>
                <Estudante />
              </ProtectRouter>
            }
          />
        </Route>
        <Route exact path="/cadastro" element={<CadastrarUsuario />} />
        <Route exact path="/lesson" element={<Lesson />} />
        <Route
          exact
          path="/perfil/:id"
          element={
            <ProtectRouter>
              <Perfil />
            </ProtectRouter>
          }
        />
        <Route
          exact
          path="/prim"
          element={
            <ProtectRouter>
              <RelatorioPropina />
            </ProtectRouter>
          }
        />
        <Route
          exact
          path="/fotoperfil"
          element={
            <ProtectRouter>
              <TrocaFoto />
            </ProtectRouter>
          }
        />
        <Route
          exact
          path="/fotos/:id"
          element={
            <ProtectRouter>
              <Fotos />
            </ProtectRouter>
          }
        />

        <Route
          exact
          path="/edit/publication/:id"
          element={
            <ProtectRouter>
              <EditarPublicacao />
            </ProtectRouter>
          }
        />

        <Route
          exact
          path="/propina"
          element={
            <ProtectRouter>
              <Propina />
            </ProtectRouter>
          }
        />
        <Route
          exact
          path="/pagamentos/menu/:tipo"
          element={
            <ProtectRouter>
              <MenuPagamento />
            </ProtectRouter>
          }
        />
        <Route
          exact
          path="/coment/:id"
          element={
            <ProtectRouter>
              <LerComentarioPublicacao />
            </ProtectRouter>
          }
        />
        <Route
          exact
          path="/coment/publication/:id"
          element={
            <ProtectRouter>
              <LerComentarioPublicacao />
            </ProtectRouter>
          }
        />

        <Route
          exact
          path="/chat/:userId"
          element={
            <ProtectRouter>
              <Chat />
            </ProtectRouter>
          }
        />
        <Route
          exact
          path="/publicar"
          element={
            <ProtectRouter>
              <Publicar />
            </ProtectRouter>
          }
        />

        <Route
          exact
          path="/home/page"
          element={
            <ProtectRouter>
              <CriarPagina />
            </ProtectRouter>
          }
        />
        <Route
          exact
          path="/page/:id"
          element={
            <ProtectRouter>
              <Pagina />
            </ProtectRouter>
          }
        />
        <Route
          exact
          path="/info/page"
          element={
            <ProtectRouter>
              <Pagina />
            </ProtectRouter>
          }
        />
        <Route
          exact
          path="/publicar/page/:id"
          element={
            <ProtectRouter>
              <PublicacarPagina />
            </ProtectRouter>
          }
        />
        <Route
          exact
          path="/allpage"
          element={
            <ProtectRouter>
              <TodasPaginas />
            </ProtectRouter>
          }
        />
        <Route
          exact
          path="/coment/publication/page/:id"
          element={
            <ProtectRouter>
              <ComentPublicationPage />
            </ProtectRouter>
          }
        />
        <Route
          exact
          path="/edit/coment/:id"
          element={
            <ProtectRouter>
              <EditComentPage />
            </ProtectRouter>
          }
        />
        <Route
          exact
          path="/edit/coment/publication/:id"
          element={
            <ProtectRouter>
              <EditarComentarioPublicacao />
            </ProtectRouter>
          }
        />

        <Route
          exact
          path="/edit/publication/page/:id"
          element={
            <ProtectRouter>
              <EdiatrPublicacaoPagina />
            </ProtectRouter>
          }
        />

        <Route
          exact
          path="/search"
          element={
            <ProtectRouter>
              <Search />
            </ProtectRouter>
          }
        />
        <Route
          exact
          path="/search/page"
          element={
            <ProtectRouter>
              <SearchPage />
            </ProtectRouter>
          }
        />
        <Route
          exact
          path="/search/user"
          element={
            <ProtectRouter>
              <SearchUser />
            </ProtectRouter>
          }
        />

        <Route
          exact
          path="/declaracoes"
          element={
            <ProtectRouter>
              <Declaracoes />
            </ProtectRouter>
          }
        />
        <Route
          exact
          path="/editar/comunicado/:id"
          element={
            <ProtectRouter>
              <EditarComunicado />
            </ProtectRouter>
          }
        />
        <Route
          exact
          path="/editar/publicacao/perfil/:id"
          element={
            <ProtectRouter>
              <EditarPublicacaoPerfil />
            </ProtectRouter>
          }
        />
        <Route exact path="cursos" element={<Cursos />}>
          <Route path=":id" element={<AnoCurso />}>
            <Route path="disciplina/:idano" element={<Disciplina />} />
          </Route>
        </Route>

        <Route exact path="/professor/:id" element={<Professor />} />
        {/* <Route exact path="/anos/:ano/:idcurso" element={<AnoCurso />} /> */}

        <Route path="*" Component={() => <h1>Page not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
export default Routeting;
