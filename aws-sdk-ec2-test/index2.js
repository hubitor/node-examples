'use strict';

var AWS = require('aws-sdk');

var jsonStringify = require('canonical-json');
var jsonMask = require('json-mask');
var Promise = require('promise');

// http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html#Credentials_from_the_Shared_Credentials_File_____aws_credentials_
// -- or --
// AWS.config.update({
//   accessKeyId: '',
//   secretAccessKey: ''
// });

var ec2 = new AWS.EC2({region: 'us-west-2'});

// Convert the `ec2.describeInstances()` into a Promise.
function describeInstancesP(ec2) {
  return new Promise(function (resolve, reject) {
    ec2.describeInstances(function (err, instances) {
      if (err) {
        return reject(err);
      }
      resolve(instances);
    });
  });
}

describeInstancesP(ec2).then(filterJson).then(prettyJson).then(console.log, console.error);

/**
 * Filter the JSON object.
 * @param  {Object} data An object to filter.
 * @return {Object} A filtered JSON object with only the specified fields.
 */
function filterJson(data) {
  return jsonMask(data, 'Reservations/Instances(LaunchTime,Placement/AvailabilityZone,PrivateIpAddress,State,StateReason,ImageId,InstanceId,)');
}

/**
 * Pretty-print the JSON object so it is more human readable.
 * @param  {Object} data An object to format.
 * @return {String} A JSON formatted string.
 */
function prettyJson(data) {
  return jsonStringify(data, null, 2);
}
