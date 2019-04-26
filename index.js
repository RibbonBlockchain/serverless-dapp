const Util = require("./utils/index");
const PatientService = require("./services/Patient.service");
const PractitionerService = require("./services/Practitioner.service");
const InteractionService = require("./services/Interaction.service");

exports.handler = (event, context, callback) => {
  let errors;

  switch (event.field || event.fields) {
    case "createPatient":
      errors = Util.checkRequestBody(event.arguments, [
        "patientId",
        "firstName",
        "lastName",
        "phoneNumber"
      ]);
      if (errors) {
        callback(
          Util.handleResponse({
            error: true,
            message: "Invalid input/entry provided",
            data: errors
          })
        );
      } else {
        PatientService.create(event.arguments, response => {
          if (response.error) {
            callback(response.message);
          } else {
            callback(null, response.data);
          }
        });
      }
      break;
    case "patients":
      PatientService.getAll(response => {
        if (response.error) {
          callback(response.message);
        } else {
          callback(null, response.data);
        }
      });
      break;
    case "patient":
      errors = Util.checkRequestBody(event.arguments, ["id"]);
      if (errors) {
        callback(
          Util.handleResponse({
            error: true,
            message: "Invalid input/entry provided.",
            data: errors
          })
        );
      } else {
        PatientService.get(event.arguments.id, response => {
          if (response.error) {
            callback(response.message);
          } else {
            callback(null, response.data);
          }
        });
      }
      break;
    case "createPractitioner":
      errors = Util.checkRequestBody(event.arguments, [
        "practitionerId",
        "firstName",
        "lastName",
        "phoneNumber"
      ]);
      if (errors) {
        callback(
          Util.handleResponse({
            error: true,
            message: "Invalid input/entry provided",
            data: errors
          })
        );
      } else {
        PractitionerService.create(event.arguments, response => {
          if (response.error) {
            callback(response.message);
          } else {
            callback(null, response.data);
          }
        });
      }
      break;

    case "practitioners":
      PractitionerService.getAll(response => {
        if (response.error) {
          callback(response.message);
        } else {
          callback(null, response.data);
        }
      });
      break;
    case "practitioner":
      errors = Util.checkRequestBody(event.arguments, ["id"]);
      if (errors) {
        callback(
          Util.handleResponse({
            error: true,
            message: "Invalid input/entry provided.",
            data: errors
          })
        );
      } else {
        PractitionerService.get(event.arguments.id, response => {
          if (response.error) {
            callback(response.message);
          } else {
            callback(null, response.data);
          }
        });
      }
      break;
    case "createInteraction":
      errors = Util.checkRequestBody(event.arguments, [
        "patientId",
        "practitionerId",
        "interaction"
      ]);
      if (errors) {
        callback(
          Util.handleResponse({
            error: true,
            message: "Invalid input/entry provided.",
            data: errors
          })
        );
      } else {
        InteractionService.create(event.arguments, response => {
          if (response.error) {
            callback(response.message);
          } else {
            callback(null, response.data);
          }
        });
      }
      // Util.sendToken("0xB0793421c0E8dD39439CD6916140acfA9F563e90", 100);
      break;
    case "interactions":
      InteractionService.getAll(response => {
        if (response.error) {
          callback(response.message);
        } else {
          callback(null, response.data);
        }
      });
      break;
    case "interaction":
      errors = Util.checkRequestBody(event.arguments, ["id"]);
      if (errors) {
        callback(
          Util.handleResponse({
            error: true,
            message: "Invalid input/entry provided.",
            data: errors
          })
        );
      } else {
        InteractionService.get(event.arguments.id, response => {
          if (response.error) {
            callback(response.message);
          } else {
            callback(null, response.data);
          }
        });
      }
      break;
    case "patientInteractions":
      errors = Util.checkRequestBody(event.arguments, ["id"]);
      if (errors) {
        callback(
          Util.handleResponse({
            error: true,
            message: "Invalid input/entry provided.",
            data: errors
          })
        );
      } else {
        InteractionService.getByPatient(event.arguments.id, response => {
          if (response.error) {
            callback(response.message);
          } else {
            callback(null, response.data);
          }
        });
      }
      break;
    case "practitionerInteractions":
      errors = Util.checkRequestBody(event.arguments, ["id"]);
      if (errors) {
        callback(
          Util.handleResponse({
            error: true,
            message: "Invalid input/entry provided.",
            data: errors
          })
        );
      } else {
        InteractionService.getByPractitioner(event.arguments.id, response => {
          if (response.error) {
            callback(response.message);
          } else {
            callback(null, response.data);
          }
        });
      }
      break;
    default:
      throw new Error("Unknown method");
  }
};
