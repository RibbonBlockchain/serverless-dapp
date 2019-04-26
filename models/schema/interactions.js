const joi = require("joi");
const dynogels = require("dynogels");

dynogels.AWS.config.update({
  accessKeyId: "AKIA4NND44SJYEQKSMEC",
  secretAccessKey: "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",
  region: "eu-west-1"
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
