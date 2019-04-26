const _ = require("lodash");
const uuid = require("uuid/v4");
const PatientModel = require("../models/Patient.model");

const PatientService = {
  create: (data, callback) => {
    let allowedParameters = [
      "patientId",
      "firstName",
      "lastName",
      "phoneNumber",
      "address"
    ];
    let patient = _.pick(data, allowedParameters);
    patient["id"] = uuid();
    patient["createdAt"] = new Date().toISOString();

    PatientModel.save(patient, response => {
      if (response.error) {
        callback({ error: true, message: response.message.message });
      } else {
        callback({ error: false, data: response });
      }
    });
  },

  // get: (id, callback) => {
  //   PatientModel.getOneByPatientId(id, response => {
  //     if (!response.Item) {
  //       callback({
  //         error: true,
  //         message: "Patient does not exist"
  //       });
  //     } else {
  //       callback({
  //         error: false,
  //         data: response.Item
  //       });
  //     }
  //   });
  // },

  getAll: callback => {
    PatientModel.getAll(response => {
      if (response.Items.length < 1) {
        callback({
          error: true,
          message: `Could not fetch patients`
        });
      } else {
        callback({
          error: false,
          data: response.Item || response.Items
        });
      }
    });
  },

  get: (id, callback) => {
    PatientModel.getOneByKey(id, response => {
      if (response.Item.id) {
        callback({
          error: false,
          data: response.Item
        });
      } else {
        callback({
          error: true,
          message: `Could not fetch patients`
        });
      }
    });
  }
};

module.exports = PatientService;
