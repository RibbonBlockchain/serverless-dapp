const joi = require("joi");
const dynogels = require("dynogels");

dynogels.AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION
});

let Interactions = dynogels.define("Interactions", {
  hashKey: "id",
  timestamps: true,
  schema: {
    id: dynogels.types.uuid(),
    practitioner: joi.string().required(),
    patient: joi.string().required(),
    interaction: joi.string().required()
  },
  indexes: [
    {
      hashKey: "patient",
      name: "patientIndex",
      type: "global"
    },
    {
      hashKey: "practitioner",
      name: "practitionerIndex",
      type: "global"
    }
  ]
});

module.exports.Interactions = Interactions;
