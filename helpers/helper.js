'use strict';

var Promise = require('bluebird'),
    cp = require('child_process');

module.exports = {
  getLibVirtVersion: function() {
    return new Promise(function(resolve, reject) {
      cp.exec('pkg-config --modversion libvirt', function(err, stdout, stderr) {
        if (!!err) return reject(err);
        // some versions return an extra "dot", e.g. Fedora 22 "1.2.13.1"
        // which semver can't handle
        var verString = stdout.trim();
        var verParts = verString.split(/\./);
        verParts.splice(3, verParts.length - 3);
        verString = verParts.join('.');
        resolve(verString);
      });
    });
  }
};

