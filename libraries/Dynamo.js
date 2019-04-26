const AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-west-1",
  accessKeyId: "AKIA4NND44SJYEQKSMEC",
  secretAccessKey: "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"
});

const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

const Dynamo = {
  _createTable: (table, key, callback) => {
    const dynamo = new AWS.DynamoDB();
    const params = {
      TableName: table,
      KeySchema: [{ AttributeName: key, KeyType: "HASH" }],
      AttributeDefinitions: [{ AttributeName: key, AttributeType: "S" }],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
      }
    };

    dynamo.createTable(params, (err, res) => {
      if (err) return callback(err);
      else console.log(`${params.TableName} successfully created`);
    });
  },

  _save: (param, callback) => {
    docClient.put(param, (err, savedData) => {
      if (err != null) return callback(Dynamo.handleError(err));
      else return callback(param.Item);
    });
  },

  _update: (data, callback) => {
    docClient.update(data, (err, returnData) => {
      if (err) return callback(Dynamo.handleError(err));
      else return callback(returnData);
    });
  },

  _getByKey: (param, callback) => {
    docClient.get(param, (err, data) => {
      if (err) return callback(Dynamo.handleError(err));
      else return callback(data);
    });
  },

  _getAllByKey: (query, callback) => {
    docClient.query(query, (err, data) => {
      if (err) {
        return callback(Dynamo.handleError(err));
      } else {
        return callback(data);
      }
    });
  },

  _get: (query, callback) => {
    docClient.scan(query, (err, data) => {
      if (err) {
        return callback(Dynamo.handleError(err));
      } else {
        return callback(data);
      }
    });
  },

  _findAll: function(param, callback) {
    docClient.scan(param, (error, data) => {
      if (error) {
        return callback(Dynamo.handleError(error));
      } else {
        callback(data);
      }
    });
  },

  onScan: (err, data) => {
    if (err) return callback(Dynamo.handleError(err));
    else {
      if (typeof data.LastEvaluatedKey !== "undefined") {
        param.ExclusiveStartKey = data.LastEvaluatedKey;
        docClient.scan(param, onScan);
      }
      return callback(data);
    }
  },
  _delete: (params, callback) => {
    docClient.delete(params, (err, data) => {
      if (err) {
        callback(Dynamo.handleError(err));
      } else {
        callback(data);
      }
    });
  },

  scan: (key, value, table, callback) => {
    let params = {
      TableName: table,
      FilterExpression: `${key} = :value`,
      ExpressionAttributeValues: { ":value": value }
    };
    docClient.scan(params, (err, data) => {
      if (err) {
        callback(Dynamo.handleError(err));
      } else {
        callback(data);
      }
    });
  },

  handleError: report => {
    return { error: true, message: report };
  }
};

module.exports = Dynamo;
