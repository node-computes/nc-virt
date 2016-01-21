
var libvirt = require('libvirt'),
    Hypervisor = libvirt.Hypervisor;

var libvirt_socket = new Hypervisor('qemu:///system');

var parseXml = require('xml2js').parseString;

function connect (callback) {
    libvirt_socket.connect(function() {
        callback();
    });
}

function getHypervisor (get_info, action_callback) {
    libvirt_socket[get_info](function (err, result) {
        action_callback(result);
    });
}

module.exports = {
    hypervisor_get: function () {
        return {
            info: function (action_callback) {
                connect(function () {
                    getHypervisor('getNodeInfo', function (res) {
                        action_callback(res);
                    })
                })
            },
            hostname: function (action_callback) {
                connect(function () {
                    getHypervisor('getHostname', function (res) {
                        action_callback(res);
                    })
                });
            },
            type: function (action_callback) {
                connect(function () {
                    getHypervisor('getType', function (res) {
                        action_callback(res);
                    })
                });
            },
            capabilities: function (action_callback) {
                connect(function () {
                    getHypervisor('getCapabilities', function (xml) {
                        parseXml(xml, function (err, result) {
                            action_callback(JSON.stringify(result));
                        });
                    })
                });
            },
            system_info: function (action_callback) {
                connect(function () {
                    getHypervisor('getSysInfo', function (xml) {
                        parseXml(xml, function (err, result) {
                            action_callback(JSON.stringify(result));
                        });
                    })
                });
            },

            version: function (action_callback) {
                connect(function () {
                    getHypervisor('getVersion', function (res) {
                        action_callback(res);
                    })
                });
            },
            libvirt_version: function (action_callback) {
                connect(function () {
                    getHypervisor('getLibVirtVersion', function (res) {
                        action_callback(res);
                    })
                });
            }
        }
    },

    instance_get: function () {
        return {

            list: function () {

            },

            show: function () {

            }
        }
    },

    instance_set: function () {
        return {
            start: function () {
                console.log('create vm')
            },

            destroy: function (vm_id) {
                console.log('lol')
            }
        }
    }
};