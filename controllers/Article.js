const validator = require('validator');
const Article = require('../models/Article');

const test = (req, res) => {
  return res.status(200).json({
    message: 'this is a test msj'
  });
};

const personal_data = (req, res) => {
  console.log("se esta ejecutando la ruta test");
  return res.status(200).send({
    name: 'Heiner',
    last_name: 'Landero',
    title: 'Frontend dev'
  });
};

const create = async (req, res) => {
  let params = req.body;

  // Validar datos
  try {
    let titleValidated = !validator.isEmpty(params.title) &&
                         validator.isLength(params.title, { min: 1, max: undefined });
    let contentValidated = !validator.isEmpty(params.content);

    if (!titleValidated || !contentValidated) {
      throw new Error('Error, data no is validated');
    }

    const article = new Article(params);
    const articleSaved = await article.save();

    if (!articleSaved) {
      throw new Error('Error, article no saved');
    }

    return res.status(200).json({
      status: 'success',
      article: articleSaved,
      message: 'Article saved'
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      message: 'Error, incomplete data'
    });
  }
};

module.exports = {
  test,
  personal_data,
  create
};
