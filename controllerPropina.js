const { where, Op } = require("sequelize");
const AnoLetivo = require("../models/anoLetivo");
const Cursos = require("../models/cursos");
const Estudante = require("../models/estudante");
const Mes = require("../models/mes");
const Propina = require("../models/propina");
const usuario = require("../models/usuario");
const Semestre = require("../models/semestre");

const createPropina = async (req, res) => {
  try {
    const {
      valor,
      fk_mes,
      fk_estudante,
      fk_curso,
      fk_user,
      fk_ano,
      fk_semestre,
      rupe,
    } = req.body;

    if (
      valor === 0 ||
      valor === undefined ||
      fk_ano === 0 ||
      fk_ano === undefined ||
      fk_curso === 0 ||
      fk_curso === undefined ||
      fk_estudante === 0 ||
      fk_estudante === undefined ||
      fk_mes === 0 ||
      fk_mes === undefined ||
      fk_semestre === 0 ||
      fk_semestre === undefined ||
      fk_user === 0 ||
      fk_user === undefined ||
      rupe === 0 ||
      fk_ano === null
    ) {
      res.status(201).json({ message: "error" });
      return;
    }
    const response = await Propina.findOne({
      include: [
        { model: Mes, where: { id: fk_mes } },
        { model: Semestre, where: { id: fk_semestre } },
        { model: AnoLetivo, where: { id: fk_ano } },
        { model: Estudante, where: { id: fk_estudante } },
      ],
    });
    if (response) {
      res.status(201).json({ message: "exist" });
      return;
    }
    await Propina.create({
      valor,
      fk_mes,
      fk_curso,
      fk_estudante,
      fk_user,
      rupe,
      fk_ano,
      fk_semestre,
      createdAt: Date.now(),
    });

    res.status(201).json({ message: "sucess" });
  } catch (error) {
    res.json({ message: error });
  }
};

const getPropinasMensal = async (req, res) => {
  const { bi, mes, ano } = req.body;
  try {
    const response = await Propina.findOne({
      include: [
        {
          model: Estudante,
          where: {
            bi,
          },
        },
        { model: usuario },
        { model: Semestre },
        { model: Cursos },

        {
          model: AnoLetivo,
          where: {
            ano,
          },
        },
        {
          model: Mes,
          where: {
            mes,
          },
        },
      ],
      order: [["id", "ASC"]],
    });

    res.status(200).json(response);
  } catch (error) {
    res.json(error);
  }
};
const getPropinasAnual = async (req, res) => {
  const { bi, ano, semestre } = req.body;
  try {
    const response = await Propina.findAll({
      include: [
        {
          model: Estudante,
          where: {
            bi,
          },
        },
        { model: usuario },
        { model: Cursos },

        {
          model: AnoLetivo,
          where: {
            ano,
          },
        },
        { model: Mes },
      ],
      order: [["id", "ASC"]],
    });

    res.status(200).json(response);
  } catch (error) {
    res.json(error);
  }
};

const verDivida = async (req, res) => {
  const { bi } = req.body;
  try {
    const meses = [
      "Outubro",
      "Novembro",
      "Dezembro",
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
    ];
    const agora = Date.now();
    const date = new Date(agora);

    let [mesHoje, c] = date
      .toLocaleTimeString("pt-BR", { month: "long" })
      .split(" ");

    const [ano, dia] = date
      .toLocaleTimeString("pt-BR", { year: "numeric" })
      .split(",");

    const response = await Propina.findAll({
      include: [
        { model: usuario },
        {
          model: Mes,
        },
        { model: Estudante, where: { bi } },
        {
          model: AnoLetivo,
          where: {
            ano: {
              [Op.like]: `%${ano}%`,
            },
          },
        },
      ],
    });

    let mesesAll = [];
    let mesesAll1 = [];
    response.map((prop) => {
      mesesAll.push(prop.Me.mes);
    });

    for (let mes = 0; mes < meses.length; mes++) {
      if (meses[mes].toLowerCase() === mesHoje.toLowerCase()) break;

      if (!mesesAll.some((me) => me.includes(meses[mes]))) {
        mesesAll1.push(meses[mes]);
      }
    }

    if (mesesAll1.length <= 0) res.json({ message: "Sem dívida" });

    res.json({ dividas: mesesAll1, message: "está com dívida" });
  } catch (error) {
    console.log({ mensage: error });
  }
};
const getPropinas = async (req, res) => {
  try {
    const response = await Propina.findAll({
      include: [
        { model: Estudante },
        { model: usuario },
        { model: Cursos },
        { model: AnoLetivo },
        { model: Mes },
      ],
      order: [["id", "ASC"]],
    });

    res.status(200).json(response);
  } catch (error) {
    res.json(error);
  }
};
const getPropina = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Propina.findOne({
      include: [
        { model: Estudante },
        { model: usuario },
        { model: Cursos },
        { model: AnoLetivo },
        { model: Mes },
        { model: Semestre },
      ],
      where: {
        id,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.json(error);
  }
};
const getPropinaEspecifico = async (req, res) => {
  try {
    const { id } = req.body;

    const response = await Propina.findOne({
      include: [
        { model: Estudante },
        { model: usuario },
        { model: Cursos },
        { model: AnoLetivo },
        { model: Mes },
        { model: Semestre },
      ],
      where: {
        id,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.json(error);
  }
};

const deletePropina = async (req, res) => {
  try {
    const { id } = req.params;

    await Propina.destroy({
      where: {
        id,
      },
    });
  } catch (error) {
    res.json(error);
  }
};
const upDatePropina = async (req, res) => {
  try {
    const { id } = req.params;
    const { fk_mes, fk_ano, rupe } = req.body;
    if (!fk_ano || !fk_mes || !rupe) {
      return res.json({ message: "Error" });
    }
    const resp = await Propina.findByPk(id);

    resp.fk_mes = fk_mes;
    resp.fk_ano = fk_ano;
    resp.rupe = rupe;
    resp.save();
    res.json({ message: "Sucess" });
  } catch (error) {
    res.json({ message: "Error" });
  }
};

const getEstudantePropina = async (req, res) => {
  try {
    const agora = Date.now();
    const date = new Date(agora);

    let [mesHoje, hour] = date
      .toLocaleTimeString("pt-BR", { month: "numeric" })
      .split(",");

    const { ano, id } = req.params;

    if (Number(mesHoje) === Number(1)) {
      mesHoje = 12;
      const response = await Propina.findAll({
        include: [
          { model: usuario },
          {
            model: Mes,
            where: {
              algarismo: {
                [Op.eq]: `${Number(mesHoje)}`,
              },
            },
          },
          { model: AnoLetivo },
        ],
        where: {
          [Op.and]: {
            fk_ano: ano,
          },
        },
      });
      if (!response[0]) {
        res.json({
          Mensagem: "Deves Fazer o Pagamento das tuas Propinas",
          m: response[0],
        });
      } else if (response[0]) {
        res.json({ Mensagem: "Situação da Propina Legal" });
      }
      return;
    }

    const response = await Propina.findAll({
      include: [
        { model: usuario },
        {
          model: Mes,
          where: {
            algarismo: {
              [Op.eq]: `${Number(mesHoje) - 1}`,
            },
          },
        },
        { model: AnoLetivo },
      ],
      where: {
        fk_ano: ano,
      },
    });

    if (!response[0]) {
      res.json({
        Mensagem: "Deves Fazer o Pagamento das tuas Propinas",
      });
    } else if (response[0]) {
      res.json({ Mensagem: "Situação da Propina Legal" });
    }
  } catch (error) {
    res.json({ mensage: error });
  }
};

module.exports = {
  createPropina,
  getPropinas,
  getPropina,
  deletePropina,
  upDatePropina,
  getEstudantePropina,
  getPropinasAnual,
  getPropinasMensal,
  getPropinaEspecifico,
  verDivida,
};
