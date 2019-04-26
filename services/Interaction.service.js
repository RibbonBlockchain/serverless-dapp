const _ = require("lodash");
const uuid = require("uuid/v4");
const InteractionModal = require("../models/Interaction.model");
const Util = require("../utils");

const InteractionService = {
  create: (data, callback) => {
    let allowedParameters = [
      "patientId",
      "practitionerId",
      "interaction",
    ];
    let interaction = _.pick(data, allowedParameters);
    interaction["id"] = uuid();
    interaction["createdAt"] = new Date().toISOString();

    InteractionModal.save(interaction, response => {
      if (response.error) {
        callback({ error: true, message: response.message.message });
      } else {
        Util.sendToken(data.address, data.amount)
          .then(response => {
            callback({ error: false, data: response });
          })
          .catch(error => {
            InteractionModal.delete(id);
            callback({ error: true, message: error });
          });
      }
    });
  },

  getByPatient: (id, callback) => {
    InteractionModal.getByPatientId(id, response => {
      if (response.Items.length < 1) {
        callback({
          error: true,
          message: "Interactions for patient does not exist"
        });
      } else {
        callback({
          error: false,
          data: response.Items
        });
      }
    });
  },

  getByPractitioner: (id, callback) => {
    InteractionModal.getByPractitionerId(id, response => {
      if (response.Items.length < 1) {
        callback({
          error: true,
          message: "Interactions for practitioner does not exist"
        });
      } else {
        callback({
          error: false,
          data: response.Items
        });
      }
    });
  },

  getAll: callback => {
    InteractionModal.getAll(response => {
      if (response.Items.length < 1) {
        callback({
          error: true,
          message: `Could not fetch interactions`
        });
      } else {
        callback({
          error: false,
          data: response.Items
        });
      }
    });
  },

  get: (id, callback) => {
    InteractionModal.getOneByKey(id, response => {
      if (response.Item.id) {
        callback({
          error: false,
          data: response.Item
        });
      } else {
        callback({
          error: true,
          message: `Could not fetch interaction`
        });
      }
    });
  }
};

module.exports = InteractionService;
