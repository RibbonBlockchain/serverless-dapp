const Dynamo = require("../libraries/Dynamo");

const TABLE_NAME = "practitioners";

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
  }
};

module.exports = PractitionerModel;
