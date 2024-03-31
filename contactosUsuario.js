const { sequelize } = require("../database/db");
const { DataTypes } = require("sequelize");
const usuario = require("./usuario");

const contactosUsuarios = sequelize.define("ContactosUsuarios", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  sendId: {
    type: DataTypes.INTEGER,
    references: {
      model: usuario,
      key: "id",
    },
  },
  receiveId: {
    type: DataTypes.INTEGER,
    references: {
      model: usuario,
      key: "id",
    },
  },
  seguir: {
    type: DataTypes.BOOLEAN,
  },
});

contactosUsuarios.belongsTo(usuario, {
  foreignKey: "sendId",
  as: "Sender",
});

contactosUsuarios.belongsTo(usuario, {
  foreignKey: "receiveId",
  as: "Receiver",
});
module.exports = contactosUsuarios;
