
var libvirt = require('libvirt'),
    Hypervisor = libvirt.Hypervisor,
    h = require('../helpers/helper');

h.getLibVirtVersion().then(function(version) {
    //console.log('LibVirt Version: ' + version);
});


var connection = new Hypervisor('qemu:///system');
connection.connect(function() {

var hypervisor = [
        { name: 'host name', method: 'getHostname' },
        { name: 'type', method: 'getType' },
        { name: 'connection uri', method: 'getConnectionUri' },
        { name: 'libvirt version', method: 'getLibVirtVersion' },
        { name: 'version', method: 'getVersion' },
        { name: 'connection secure', method: 'isConnectionSecure' },
        { name: 'connection encrypted', method: 'isConnectionEncrypted' },
        { name: 'connection alive', method: 'isConnectionAlive'},
        { name: 'capabilities', method: 'getCapabilities' },
        { name: 'system info', method: 'getSysInfo'},
    ]
  
var hypervisor_get = function(hypervisor) {
            connection[attribute.method](function(err, result) {
                console.log(result);
                hypervisor.map(hypervisor_get);
            });
    };


/*
    [
        {
            name: 'Active domains',
            method: 'listActiveDomains', expected: []
        },
        {
            name: 'defined but inactive networks',
            method: 'listDefinedNetworks', expected: []
        },
        {
            name: 'defined but inactive storage pools',
            method: 'listDefinedStoragePools',
            expected: []
        },
        {
            name: 'defined but inactive interfaces',
            method: 'listDefinedInterfaces', expected: []
        },
        {
            name: 'active physical host interfaces',
            method: 'listActiveInterfaces', expected: ['eth1']
        },
        {
            name: 'active networks',
            method: 'listActiveNetworks', expected: ['default']
        },
        {
            name: 'active storage pools',
            method: 'listActiveStoragePools', expected: ['default-pool']
        },
        {
            name: 'network filters',
            method: 'listNetworkFilters', disabled: true
        },
        {
            name: 'defined secrets (uuids)',
            method: 'listSecrets', disabled: true
        }

    ].forEach(function(testCase) {
            connection[testCase.method](function(err, result) {
               console.log(testCase.name, result)
            });
    });
*/
    connection.listActiveDomains(function(err, result) {
        result.forEach(function(activedomain) {
            connection.lookupDomainById(activedomain, function(err, domain) {

                [ //### Instance
                    {
                        name: 'Instance Name',
                        method: 'getName'
                    },
                    {
                        name: 'Instance UUID',
                        method: 'getUUID'
                    },
                    {
                        name: 'Instance Operating System Type',
                        method: 'getOSType'
                    },
                    {
                        name: 'Instance Maximum Memory',
                        method: 'getMaxMemory'
                    },
                    {
                        name: 'Instance Maximum Vcpus',
                        method: 'getMaxVcpus'
                    },
                    {
                        name: 'Instance Memory',
                        method: 'getMemoryStats'
                    },
                    {
                        name: 'Instance Vcpus',
                        method: 'getVcpus'
                    },
                    {
                        name: 'Instance State',
                        method: 'isActive'
                    }
                ].forEach(function(property) {
                    if (domain[property.method] == undefined) {
                        console.log('Undefined property ' + property.name)
                    } else {
                        domain[property.method](function(err, result) {
                            console.log(property.name, result)
                        });
                    }
                });
            });
        });
    });



});

connection.disconnect();

var Connection = (function () {
    return {
        connect: function () {
            //quemu connection here or any other
        }
    }
})();



var VirtualMachine = (function () {
    var conn = Connection.connect();

    return {

        list: function () {
            console.log('list of vms')
        },

        get: function (vm_id) {
            console.log('single vm')
        },

        create: function () {
            console.log('create vm')
        },

        delete: function (vm_id) {
            console.log('lol')
        }
    }
})();

VirtualMachine.list();
