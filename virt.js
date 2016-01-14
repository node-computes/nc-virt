
var libvirt = require('libvirt'),
    Hypervisor = libvirt.Hypervisor,
    h = require('./helpers/helper');

h.getLibVirtVersion().then(function(version) {
    //console.log('LibVirt Version: ' + version);
});

var connection = new Hypervisor('qemu:///system');
connection.connect(function() {

    connection.getHostname(function(err, result) {
        //console.log('Hostname: ' + result);
    });
    connection.getCapabilities(function(err, result) {
        //console.log(result);
    });

    connection.lookupDomainById(24, function(err, domain) {
        //console.log(domain);
    });

    connection.getSysInfo(function(err, result) {
        //console.log('SysInfo: ' + result);
    });

//    connection.vm_list = connection.getAllDomains().then(function () {
//            var self = this;
//            return Promise.join([ this.listDefinedDomainsAsync(), this.listActiveDomainsAsync()
//                ])
//                .spread(function(defined, active) { return defined.concat(active); })
//                .spread(function(defined, active) {
//                    return Promise.all([
//                        Promise.map(defined, function(domain) { return self.lookupDomainByNameAsync(domain); }),
//                        Promise.map(active, function(domain) { return self.lookupDomainByIdAsync(domain); })
//                    ]);
//                })
//                .spread(function(defined, active) { return defined.concat(active); });
//        }
//    );
//    console.log('VM List: ' + connection.vm_list);

    [
        //{ name: 'capabilities', method: 'getCapabilities' },
        { name: 'host name', method: 'getHostname' },
        { name: 'type', method: 'getType' },
        { name: 'connection uri', method: 'getConnectionUri' },
        { name: 'libvirt version', method: 'getLibVirtVersion' },
        { name: 'version', method: 'getVersion' },
        { name: 'connection secure', method: 'isConnectionSecure' },
        { name: 'connection encrypted', method: 'isConnectionEncrypted' },
        { name: 'connection alive', method: 'isConnectionAlive'},
        //{ name: 'system info', method: 'getSysInfo'},
    ].forEach(function(attribute) {
            connection[attribute.method](function(err, result) {
                console.log(result);
            });
    });



    [
        {
            name: 'defined but inactive domains',
            method: 'listDefinedDomains', expected: []
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
               console.log(testCase, result)
            });
    });



});

connection.disconnect();
