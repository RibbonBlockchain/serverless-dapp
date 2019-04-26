const _ = require("lodash");
const uuid = require("uuid/v4");
const PractitionerModel = require("../models/Practitioner.model");

const Practitioner = {
  create: (data, callback) => {
    let allowedParameters = [
      "practitionerID",
      "firstName",
      "lastName",
      "phoneNumber",
      "address"
    ];
    let practitioner = _.pick(data, allowedParameters);
    practitioner["id"] = uuid();
    practitioner["createdAt"] = new Date().toISOString();

    PractitionerModel.save(practitioner, response => {
      if (response.error) {
        callback({ error: true, message: response.message.message });
      } else {
        callback({ error: false, data: response });
      }
    });
  },

  get: (id, callback) => {
    PractitionerModel.getOneByKey(id, response => {
      if (!response.Item) {
        callback({
          error: true,
          message: "Practitioner does not exist"
        });
      } else {
        callback({
          error: false,
          data: response.Item
        });
      }
    });
  },

  getAll: callback => {
    PractitionerModel.getAll(response => {
      if (response.Items.length < 1) {
        callback({
          error: true,
          message: `Could not fetch practitioners`
        });
      } else {
        callback({
          error: false,
          data: response.Items
        });
      }
    });
  }
};

module.exports = Practitioner;
