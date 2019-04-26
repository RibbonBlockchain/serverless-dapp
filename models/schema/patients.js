const joi = require("joi");
const dynogels = require("dynogels");

dynogels.AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION
});

let Patients = dynogels.define("Patients", {
  hashKey: "id",
  timestamps: true,
  schema: {
    id: dynogels.types.uuid(),
    patientId: joi.string().required(),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    phoneNumber: joi.string().required(),
    address: joi.string().required()
  },
  indexes: [
    {
      hashKey: "patient",
      name: "patientIndex",
      type: "global"
    }
  ]
});

module.exports.Patients = Patients;
