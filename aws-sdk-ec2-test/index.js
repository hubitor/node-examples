'use strict';

var AWS = require('aws-sdk');

// http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html#Credentials_from_the_Shared_Credentials_File_____aws_credentials_
// -- or --
// AWS.config.update({
//   accessKeyId: '',
//   secretAccessKey: ''
// });

var ec2 = new AWS.EC2({region: 'us-west-2'});
ec2.describeInstances(function(err, instances) {
  if (err) {
    throw err;
  }

  var summary = {
    Reservations: instances.Reservations.map(function (reservation) {
      return {
        Instances: reservation.Instances.map(function (instance) {
          return {
            InstanceId: instance.InstanceId,
            OwnerId: instance.OwnerId,
            LaunchTime: instance.LaunchTime,
            State: instance.State,
            PlacementAvailabilityZone: instance.Placement.AvailabilityZone,
            PrivateIpAddress: instance.PrivateIpAddress,
            StateReason: instance.StateReason
          };
        })
      };
    })
  };

  console.log(JSON.stringify(summary, null, 2));
});
