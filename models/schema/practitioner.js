const joi = require("joi");
const dynogels = require("dynogels");

dynogels.AWS.config.update({
  accessKeyId: "AKIA4NND44SJYEQKSMEC",
  secretAccessKey: "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",
  region: "eu-west-1"
});

let Practitioner = dynogels.define("Practitioner", {
  hashKey: "id",
  timestamps: true,
  schema: {
    id: dynogels.types.uuid(),
    practitionerId: joi.string().required(),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    phoneNumber: joi.string().required(),
    address: joi.string().required()
  }
});

module.exports.Practitioner = Practitioner;
