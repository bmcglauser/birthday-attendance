const models = require("../models").sequelize.models;

const serverTryCatch = (f, successStatus) => async (req, res) => {
  try {
    const result = await f(req);
    res.status(successStatus);
    res.send(result);
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};

exports.getAllRespondents = serverTryCatch(async (req) => {
  return await models.Respondent.findAll();
}, 200);

exports.addRespondent = serverTryCatch(async (req) => {
  return await models.Respondent.create({
    name: req.body.name,
    response: req.body.response,
    number: req.body.number,
  });
}, 201);

exports.updateRespondent = serverTryCatch(async (req) => {
  const resp = await models.Respondent.findOne({
    where: { id: req.params.id },
  });
  if (req.body.response) resp.response = req.body.response;
  if (req.body.number) resp.number = req.body.number;
  if (req.body.name) resp.name = req.body.name;
  await resp.save();
  return resp;
}, 202);

exports.deleteRespondent = serverTryCatch(async (req) => {
  await models.Respondent.destroy({ where: { id: req.params.id } });
}, 200);
