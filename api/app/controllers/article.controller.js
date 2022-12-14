const db = require("../models");
const Article = db.articles;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const article = {
    reference: req.body.reference,
    category: req.body.category,
    name: req.body.name,
    brand: req.body.brand,
    description: req.body.description,
    url: req.body.url,
    gender: req.body.gender,
    price: req.body.price,
    newArrival: req.body.newArrival,
    reserved: req.body.reserved,
  };

  Article.create(article)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Article.",
      });
    });
};

exports.findArticles = (req, res) => {
  const referenceReq = req.query.reference;
  const categoryReq = req.query.category;
  const brandReq = req.query.brand;
  const genderReq = req.query.gender;
  const newArrivalReq = req.query.newArrival;

  let condition = { reserved: false };

  // if request for every article => no filterss
  if (referenceReq) {
    condition.reference = referenceReq;
  }
  if (categoryReq) {
    condition.category = categoryReq;
  }
  if (brandReq) {
    condition.brand = brandReq;
  }
  if (genderReq) {
    condition.gender = genderReq;
  }
  if (newArrivalReq) {
    condition.newArrival = newArrivalReq;
  }

  Article.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving article.",
      });
    });
};

exports.findOne = (req, res) => {
  const reference = req.params.reference;

  Article.findOne({ where: { reference, reserved: false } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Article with reference=${reference}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Article with reference=" + reference + err,
      });
    });
};

exports.findByCategory = (req, res) => {
  const cat = req.params.category;

  Article.findAll({ where: { category: cat, reserved: false } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Article with category=${cat}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Article with category=" + cat,
      });
    });
};

exports.findByBrand = (req, res) => {
  const brandName = req.params.brand;

  Article.findAll({ where: { brand: brandName, reserved: false } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Article with brand=${brandName}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Article with brand=" + brandName,
      });
    });
};

exports.findByGender = (req, res) => {
  const genderName = req.params.gender;

  Article.findAll({ where: { gender: genderName, reserved: false } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Article with gender=${genderName}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Article with gender=" + genderName,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Article.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Article was updated successfully." });
      } else {
        res.send({
          message: `Cannot update Article with id=${id}. Maybe Article was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Article with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Article.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Article was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Article with id=${id}. Maybe Article was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Article with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Article.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Article were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all articles.",
      });
    });
};
