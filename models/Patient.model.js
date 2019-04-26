const Dynamo = require("../libraries/Dynamo");
const Util = require("../utils");

const TABLE_NAME = "patients";

const PatientModel = {
  save: (data, callback) => {
    let param = {
      TableName: TABLE_NAME,
      Item: data
    };
    Dynamo._save(param, state => {
      return callback(state);
    });
  },
  getAll: callback => {
    let param = {
      TableName: TABLE_NAME
    };
    Dynamo._findAll(param, state => {
      return callback(state);
    });
  },
  getOneByKey: (id, callback) => {
    let params = {
      TableName: TABLE_NAME,
      Key: { id: id }
    };
    Dynamo._getByKey(params, state => {
      return callback(state);
    });
  },
  getOneByPatientId: (id, callback) => {
    let params = {
      TableName: TABLE_NAME,
      Key: { id: id },
      IndexName: "patientId-index",
      KeyConditionExpression: Util.generateKeyExpressions({
        patientId: id
      }),
      ExpressionAttributeValues: Util.generateExpressionAttributeValues({
        patientId: id
      })
    };
    Dynamo._get(params, state => {
      console.log(state);
      return callback(state);
    });
  }
};

module.exports = PatientModel;
