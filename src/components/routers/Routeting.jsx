import { BrowserRouter, Route, Routes, redirect } from "react-router-dom";

//My page
import Home from "./Home.jsx";
import CadastrarUsuario from "../routers/login/cadastrarUsuario.jsx";
import Login from "../routers/login/Login.jsx";

import Perfil from "../routers/perfil/Perfil.jsx";

import Fotos from "../routers/perfil/fotos.jsx";
import TrocaFoto from "../routers/perfil/TrocaFoto.jsx";
import ProtectRouter from "../../../auth/auth.jsx";
import { Search } from "./search/Search.jsx";
import SearchUser from "./search/SearchUser.jsx";
import Lesson from "../lesson/Lesson.jsx";
import Declaracoes from "./Comunicado/Declaracoes.jsx";
import Estudante from "./Comunicado/estudante/Estudante.jsx";
import Propina from "./Comunicado/Services/propinas/Propinas.jsx";
import MenuPagamento from "./Comunicado/Services/menu pagamentos/MenuPagamento.jsx";
import Definicoes from "./Comunicado/config/Definicoes.jsx";
import Ano from "./Comunicado/config/configuracoes/cadastrarAnoLetivo/Ano.jsx";
import Frequencia from "./Comunicado/config/configuracoes/cadastrarFrequencia/Frequencia.jsx";
import Semestre from "./Comunicado/config/configuracoes/cadastrarSemestre/Semestre.jsx";
import Cadeira from "./Comunicado/config/configuracoes/cadastrarCadeiras/Cadeira.jsx";
import Root from "../root/Root.jsx";
import Dashboard from "./Comunicado/config/dashboard/Dashboard.jsx";
import PropinaDashboard from "./Comunicado/config/dashboard/Services/propinas/Propinas.jsx";
import ExameEspecialDashboard from "./Comunicado/config/dashboard/Services/exame especial/ExameEspecial.jsx";
import SobreCadeirasDashboard from "./Comunicado/config/dashboard/Services/sobre cadeiras/SobreCadeiras.jsx";
import DeclaracaoDashboard from "./Comunicado/config/dashboard/Services/declarações/Declaracao.jsx";
import ReconfirmacaoDashboard from "./Comunicado/config/dashboard/Services/reconfirmação/Reconfirmacao.jsx";
import RecursoDashboard from "./Comunicado/config/dashboard/Services/recurso/Recurso.jsx";
import Grafico from "./Comunicado/config/grafico/Grafico.jsx";
import AtualizarPropina from "./Comunicado/config/ConfiguracoesGerais/atualizarPropina/AtualizarPropina.jsx";
import AtualizarCadeira from "./Comunicado/config/ConfiguracoesGerais/atualizarCadeira/AtualizarCadeira.jsx";
import AtualizarReconfirmacao from "./Comunicado/config/ConfiguracoesGerais/atualizarReconfirmacao/AtualizarReconfirmacao.jsx";
import Cadastrar from "./Comunicado/estudante/Cadastrar.jsx";
import Relatorios from "./Comunicado/config/dashboard/relatorios/Relatorios.jsx";
import RelatorioPropinaCurso from "./Comunicado/config/dashboard/relatorios/relatorioPropinaCurso/RelatorioPropinaCurso.jsx";
import Buscar from "./Comunicado/estudante/Buscar.jsx";
import AtualizarEstudante from "./Comunicado/config/ConfiguracoesGerais/atualizarEstudante/AtualizarEstudante.jsx";
import ActualizarMes from "./Comunicado/config/configuracoes/cadastrarMes/actualizar/Actualizar.jsx";
import ActualizarSemestre from "./Comunicado/config/configuracoes/cadastrarSemestre/atualizar/Actualizar.jsx";
import ActualizarFrequencia from "./Comunicado/config/configuracoes/cadastrarFrequencia/atualizar/Actualizar.jsx";
import ActualizarAno from "./Comunicado/config/configuracoes/cadastrarAnoLetivo/actualizar/Actualizar.jsx";
import ActualizarCurso from "./Comunicado/config/configuracoes/CadastrarCurso/actualizar/Actualizar.jsx";
import RelatorioPropina from "./Comunicado/config/dashboard/Services/relatorios/propina/Propina.jsx";
import ActualizarDisciplina from "./Comunicado/config/configuracoes/cadastrarCadeiras/atualizar/Actualizar.jsx";
import Curso from "./Comunicado/config/configuracoes/CadastrarCurso/Curso.jsx";
import Mes from "./Comunicado/config/configuracoes/cadastrarMes/Mes.jsx";
import PermissoesUSuario from "./Comunicado/config/ConfiguracoesGerais/permissoes/PermissoesUsuario.jsx";
import RelatorioListaRecurso from "./Comunicado/config/dashboard/relatorios/relatorioListaRecurso/RelatorioListaRecurso.jsx";
import RelatorioRegime from "./Comunicado/config/dashboard/relatorios/RelatorioRegime/RelatorioRegime.jsx";

const Routeting = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Root />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/relatorios/:id' element={<Relatorios />} />
        <Route
          exact
          path='/relatorio_listarecurso/:id'
          element={<RelatorioListaRecurso />}
        />
        <Route
          exact
          path='/relatorio_regime/:id'
          element={<RelatorioRegime />}
        />
        <Route
          exact
          path='/relatorio_propina/:id'
          element={
            <ProtectRouter>
              <RelatorioPropina />
            </ProtectRouter>
          }
        />
        <Route
          exact
          path='/relatorio_curso/:id'
          element={<RelatorioPropinaCurso />}
        />
        <Route exact path='/dashboard' element={<Dashboard />}>
          <Route
            exact
            path='dados/:id'
            element={
              <ProtectRouter>
                <Grafico />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path='cadastrar_disciplina/:id'
            element={
              <ProtectRouter>
                <Cadeira />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path='cadastrar_anolectivo/:id'
            element={
              <ProtectRouter>
                <Ano />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path='cadastrar_frequencia/:id'
            element={
              <ProtectRouter>
                <Frequencia />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path='cadastrar_semestre/:id'
            element={
              <ProtectRouter>
                <Semestre />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path='cadastrar_curso/:id'
            element={
              <ProtectRouter>
                <Curso />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path='cadastrar_mes/:id'
            element={
              <ProtectRouter>
                <Mes />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path='matricular_estudante/:id'
            element={
              <ProtectRouter>
                <Cadastrar />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path='atualizar_cadeira/:id'
            element={
              <ProtectRouter>
                <AtualizarCadeira />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path='atualizar_disciplina/:id'
            element={
              <ProtectRouter>
                <ActualizarDisciplina />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path='atualizar_mes/:id'
            element={
              <ProtectRouter>
                <ActualizarMes />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path='atualizar_semestre/:id'
            element={
              <ProtectRouter>
                <ActualizarSemestre />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path='atualizar_frequencia/:id'
            element={
              <ProtectRouter>
                <ActualizarFrequencia />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path='atualizar_ano/:id'
            element={
              <ProtectRouter>
                <ActualizarAno />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path='atualizar_curso/:id'
            element={
              <ProtectRouter>
                <ActualizarCurso />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path='listar_estudante/:id'
            element={
              <ProtectRouter>
                <Buscar />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path='atualizar_estudante/:id'
            element={
              <ProtectRouter>
                <AtualizarEstudante />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path='config'
            element={
              <ProtectRouter>
                <Definicoes />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path='matricula/:id'
            element={
              <ProtectRouter>
                <Cadastrar />
              </ProtectRouter>
            }
          />

          <Route
            exact
            path='propina/:id'
            element={
              <ProtectRouter>
                <PropinaDashboard />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path='exame especial/:id'
            element={
              <ProtectRouter>
                <ExameEspecialDashboard />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path='cadeira de atraso/:id'
            element={
              <ProtectRouter>
                <SobreCadeirasDashboard />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path='recurso/:id'
            element={
              <ProtectRouter>
                <RecursoDashboard />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path='declaracao/:id'
            element={
              <ProtectRouter roles={"user"}>
                <DeclaracaoDashboard />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path='reconfirmacao/:id'
            element={
              <ProtectRouter>
                <ReconfirmacaoDashboard />
              </ProtectRouter>
            }
          />

          <Route
            path='atualizar cadeira/:id'
            element={
              <ProtectRouter>
                <AtualizarCadeira />
              </ProtectRouter>
            }
          />
          <Route
            path='atualizar reconfirmacao/:id'
            element={
              <ProtectRouter>
                <AtualizarReconfirmacao />
              </ProtectRouter>
            }
          />
          <Route
            path='atualizar propina/:id'
            element={
              <ProtectRouter>
                <AtualizarPropina />
              </ProtectRouter>
            }
          />

          <Route
            exact
            path='estudante/:id'
            element={
              <ProtectRouter>
                <Estudante />
              </ProtectRouter>
            }
          />
          <Route
            exact
            path='permissoes/:id'
            element={
              <ProtectRouter>
                <PermissoesUSuario />
              </ProtectRouter>
            }
          />
        </Route>

        <Route
          exact
          path='/main'
          element={
            <ProtectRouter>
              <Home />
            </ProtectRouter>
          }></Route>
        <Route exact path='/cadastro' element={<CadastrarUsuario />} />
        <Route exact path='/lesson' element={<Lesson />} />
        <Route
          exact
          path='/perfil/:id'
          element={
            <ProtectRouter>
              <Perfil />
            </ProtectRouter>
          }
        />

        <Route
          exact
          path='/fotoperfil'
          element={
            <ProtectRouter>
              <TrocaFoto />
            </ProtectRouter>
          }
        />
        <Route
          exact
          path='/fotos/:id'
          element={
            <ProtectRouter>
              <Fotos />
            </ProtectRouter>
          }
        />

        <Route
          exact
          path='/propina'
          element={
            <ProtectRouter>
              <Propina />
            </ProtectRouter>
          }
        />
        <Route
          exact
          path='/pagamentos/menu/:tipo'
          element={
            <ProtectRouter>
              <MenuPagamento />
            </ProtectRouter>
          }
        />

        <Route
          exact
          path='/search'
          element={
            <ProtectRouter>
              <Search />
            </ProtectRouter>
          }
        />

        <Route
          exact
          path='/search/user'
          element={
            <ProtectRouter>
              <SearchUser />
            </ProtectRouter>
          }
        />

        <Route
          exact
          path='/declaracoes'
          element={
            <ProtectRouter>
              <Declaracoes />
            </ProtectRouter>
          }
        />

        <Route
          exact
          path='/ano'
          element={
            <ProtectRouter>
              <Ano />
            </ProtectRouter>
          }
        />
        <Route
          exact
          path='/frequencia'
          element={
            <ProtectRouter>
              <Frequencia />
            </ProtectRouter>
          }
        />
        <Route
          exact
          path='/semestre'
          element={
            <ProtectRouter>
              <Semestre />
            </ProtectRouter>
          }
        />
        <Route
          exact
          path='/cadeiras'
          element={
            <ProtectRouter>
              <Cadeira />
            </ProtectRouter>
          }
        />
        {/* <Route exact path="/anos/:ano/:idcurso" element={<AnoCurso />} /> */}

        <Route path='*' Component={() => <h1>Page not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
export default Routeting;
