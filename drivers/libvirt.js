
var libvirt = require('libvirt'),
    Hypervisor = libvirt.Hypervisor,
    h = require('../helpers/helper');

h.getLibVirtVersion().then(function(version){});

var libvirt_socket = new Hypervisor('qemu:///system');

var hypervisor_info = [
    { name: 'hostname', method: 'getHostname' },
    { name: 'type', method: 'getType' },
    { name: 'connection_uri', method: 'getConnectionUri' },
    { name: 'libvirt_version', method: 'getLibVirtVersion' },
    { name: 'version', method: 'getVersion' },
    { name: 'connection_secure', method: 'isConnectionSecure' },
    { name: 'connection_encrypted', method: 'isConnectionEncrypted' },
    { name: 'connection_alive', method: 'isConnectionAlive' },
    { name: 'capabilities', method: 'getCapabilities' },
    { name: 'system_info', method: 'getSysInfo' },
];

var nc_objects = [
    { name: 'active_domains', method: 'listActiveDomains' },
    { name: 'defined_but_inactive_networks', method: 'listDefinedNetworks' },
    { name: 'defined_but_inactive_storage_pools', method: 'listDefinedStoragePools' },
    { name: 'defined_but_inactive_interfaces', method: 'listDefinedInterfaces' },
    { name: 'active_physical_host_interfaces', method: 'listActiveInterfaces' },
    { name: 'active_networks', method: 'listActiveNetworks' },
    { name: 'active_storage_pools', method: 'listActiveStoragePools' },
    { name: 'network_filters', method: 'listNetworkFilters' },
    { name: 'defined_secrets_uuids', method: 'listSecrets' },
];

var instance_info = [
    { name: 'get_name', method: 'getName' },
    { name: 'get_uuid', method: 'getUUID' },
    { name: 'get_operating_system_type', method: 'getOSType' },
    { name: 'get_maximum_memory', method: 'getMaxMemory' },
    { name: 'get_maximum_vcpus', method: 'getMaxVcpus' },
    { name: 'get_memory', method: 'getMemoryStats' },
    { name: 'get_vcpus', method: 'getVcpus' },
    { name: 'get_state', method: 'isActive' },
];

var instance_actions = [
    { name: 'destroy', method: 'destroy' },
    { name: 'reboot', method: 'reboot' },
    { name: 'shutdown', method: 'shutdown' },
    { name: 'reset', method: 'reset' },
    { name: 'start', method: 'start' },
    { name: 'resume', method: 'resume' },
    { name: 'suspend', method: 'suspend' },
    { name: 'save', method: 'save' },
];

var get_hypervisor_infos = function(hypervisor_info) {
        conn[hypervisor_info.method](function(err, result) {
            console.log(result);
        });
};

var get_active_domains_name = function(active_domains) {
  conn
};

var get_nc_objects = function(nc_objects) {
        libvirt_socket[nc_objects.method](function(err, result) {
            console.log(result);
        });
};

var get_instance_info = function(instance_info) {
        libvirt_socket[instance_info.method](function(err, result) {
            if (domain[property.method] == undefined) {
                console.log('Undefined property ' + property.name)
            } else {
                domain[property.method](function(err, result) {
                    console.log(property.name, result)
                });
            }
        });
};

var set_instance_action = function(instance_action) {
    libvirt_socket[attribute.method](function(err, result) {
        console.log(result);
    });
};


var hypervisor = (function () {
    return {
        hostname: function () {
            libvirt_socket.connect(function() {
                libvirt_socket.getHostname(function(err, hostname) {
                    console.log(hostname);
                    return hostname;
                });
            });
        },
        type: function () {
            libvirt_socket.connect(function() {
                libvirt_socket.getType(function(err, type) {
                    console.log(type);
                    return type;
                });
            });
        },
        capabilities: function () {
            libvirt_socket.connect(function() {
                libvirt_socket.getCapabilities(function(err, capabilities) {
                        console.log(capabilities);
                        return capabilities;
                    });
            });
        },
        system_info: function () {
            libvirt_socket.connect(function() {
                libvirt_socket.getSysInfo(function(err, sysinfo) {
                    console.log(sysinfo);
                    return sysinfo;
                });
            });
        },

        version: function () {
            libvirt_socket.connect(function() {
                libvirt_socket.getVersion(function(err, version) {
                    console.log(version);
                    return version;
                });
            });
        },
        libvirt_version: function () {
            libvirt_socket.connect(function() {

                libvirt_socket.getLibVirtVersion(function(err, version) {
                    console.log(version);
                    return version;
                });
            });
        }
    }
})();

var instance = (function () {
    return {

        list: function () {
            libvirt_socket.connect(function() {
                var listIdActiveDomains = 'none';

                libvirt_socket.listActiveDomains(function (err, activedomain) {
                    console.log(activedomain);
                });
                libvirt_socket.lookupDomainById(30, function (err, domain) {
                });
            });
            //var listNameActiveDomains = listIdActiveDomains.map();
            //console.log('list of vms')
        },

        show: function () {
            var instanceInfo = iDActiveDomains.map(get_instance_info);
            return get_instance_info
            console.log(get_instance_info)
        },

        start: function () {
            console.log('create vm')
        },

        destroy: function (vm_id) {
            console.log('lol')
        }


    }
})();


hypervisor.hostname();
//hypervisor.type();
//hypervisor.capabilities();
//hypervisor.system_info();
//hypervisor.version();
//hypervisor.libvirt_version();
instance.list();