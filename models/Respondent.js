module.exports = (sequelize, DataTypes) => {
  const Respondent = sequelize.define("Respondent", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    response: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Respondent;
};
