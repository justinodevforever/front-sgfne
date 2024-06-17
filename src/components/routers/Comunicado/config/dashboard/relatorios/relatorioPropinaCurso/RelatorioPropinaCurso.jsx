import "./relatorioPropinaCurso.scss";

const RelatorioPropinaCurso = () => {
  return (
    <div className='relatorioPropinaCurso'>
      <h1>Relatório Geral Propina</h1>
      <table>
        <thead>
          <tr>
            <th>Data Início 20/04/2024</th>
            <th>Data Final 14/02/2024</th>
            <th>Data de Impreção 14/02/2024</th>
          </tr>
        </thead>
      </table>
      <table className='table2C'>
        <thead>
          <tr>
            <th rowSpan={2}>Curso</th>
            <th rowSpan={2}>Frequência</th>
            <th colSpan={3}>Total Matriculado</th>
            <th colSpan={2}>Janeiro</th>
            <th colSpan={2}>Fevereiro</th>
            <th colSpan={2}>Março</th>
            <th colSpan={2}>Abril</th>
            <th colSpan={2}>Maio</th>
            <th colSpan={2}>Junho</th>
            <th colSpan={2}>Julho</th>
            <th colSpan={2}>Outubro</th>
            <th colSpan={2}>Novembro</th>
            <th colSpan={2}>Dezembro</th>
            <th colSpan={2}>TOTAL GERAL</th>
          </tr>
          <tr>
            <th>M</th>
            <th>F</th>
            <th>M + F</th>
            <th>Qtda.</th>
            <th>Valor</th>
            <th>Qtda.</th>
            <th>Valor</th>
            <th>Qtda.</th>
            <th>Valor</th>
            <th>Qtda.</th>
            <th>Valor</th>
            <th>Qtda.</th>
            <th>Valor</th>
            <th>Qtda.</th>
            <th>Valor</th>
            <th>Qtda.</th>
            <th>Valor</th>
            <th>Qtda.</th>
            <th>Valor</th>
            <th>Qtda.</th>
            <th>Valor</th>
            <th>Qtda.</th>
            <th>Valor</th>
            <th>Qtda.</th>
            <th>Paamentos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan={5}>Enfermagem</td>
            <td>1º Ano</td>
            <td>10</td>
            <td>19</td>
            <td>29</td>
            <td>3</td>
            <td>5700.00</td>
            <td>3</td>
            <td>5700.00</td>
            <td>3</td>
            <td>5700.00</td>
            <td>3</td>
            <td>5700.00</td>
            <td>3</td>
            <td>5700.00</td>
            <td>3</td>
            <td>5700.00</td>
            <td>3</td>
            <td>5700.00</td>
            <td>3</td>
            <td>5700.00</td>
            <td>3</td>
            <td>5700.00</td>
            <td>3</td>
            <td>5700.00</td>
            <td>3</td>
            <td>5700.00</td>
          </tr>
          <tr>
            <td>2º Ano</td>
            <td>10</td>
            <td>19</td>
            <td>29</td>
            <td>3</td>
            <td>5700.00</td>
            <td>3</td>
            <td>5700.00</td>
            <td>3</td>
            <td>5700.00</td>
            <td>3</td>
            <td>5700.00</td>
            <td>3</td>
            <td>5700.00</td>
            <td>3</td>
            <td>5700.00</td>
            <td>3</td>
            <td>5700.00</td>
            <td>3</td>
            <td>5700.00</td>
            <td>3</td>
            <td>5700.00</td>
            <td>3</td>
            <td>5700.00</td>
            <td>3</td>
            <td>5700.00</td>
          </tr>
        </tbody>
      </table>
      <br />
      <span>Rua da Missão, Bairro Zorró</span>
      <span>Cxa. Postal: Tel: +244 949577832</span>
    </div>
  );
};

export default RelatorioPropinaCurso;
