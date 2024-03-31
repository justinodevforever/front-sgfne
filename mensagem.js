const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");
const usuario = require("./usuario");
const contactosUsuarios = require("./contactosUsuario");

const mensagem = sequelize.define(
  "Mensagen",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sms: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    lida: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false }
);
usuario.hasMany(mensagem, {
  foreignKey: "sendId",
  sourceKey: "id",
});
mensagem.belongsTo(usuario, {
  foreignKey: "sendId",
  targetId: "id",
});

contactosUsuarios.hasMany(mensagem, {
  foreignKey: "contactId",
  sourceKey: "id",
});
mensagem.belongsTo(contactosUsuarios, {
  foreignKey: "contactId",
  targetId: "id",
});

module.exports = mensagem;
