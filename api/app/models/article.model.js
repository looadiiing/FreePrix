module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define("article", {
    reference: {
      type: Sequelize.INTEGER,
    },
    category: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    brand: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.STRING,
      validate: { isUrl: true },
    },
    gender: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.FLOAT(10.2),
    },
    newArrival: {
      type: Sequelize.BOOLEAN,
    },
    reserved: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });

  return Article;
};
