const Dynamo = require("../libraries/Dynamo");
const Util = require("../utils");

const TABLE_NAME = "interactions";

const PractitionerModel = {
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
  getByPatientId: (id, callback) => {
    let params = {
      TableName: TABLE_NAME,
      IndexName: "patientId-index",
      KeyConditionExpression: Util.generateKeyExpressions({
        patientId: id
      }),
      ExpressionAttributeValues: Util.generateExpressionAttributeValues({
        patientId: id
      }),
      Key: { patientId: id }
    };
    Dynamo._getAllByKey(params, state => {
      return callback(state);
    });
  },

  getByPractitionerId: (id, callback) => {
    let params = {
      TableName: TABLE_NAME,
      IndexName: "practitionerId-index",
      KeyConditionExpression: Util.generateKeyExpressions({
        practitionerId: id
      }),
      ExpressionAttributeValues: Util.generateExpressionAttributeValues({
        practitionerId: id
      }),
      Key: { practitionerId: id }
    };
    Dynamo._getAllByKey(params, state => {
      return callback(state);
    });
  },

  delete: id => {
    let params = {
      TableName: TABLE_NAME,
      Key: id
    };
    Dynamo._delete(params, state => {
      return callback(state);
    });
  }
};

module.exports = PractitionerModel;
