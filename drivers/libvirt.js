
var libvirt = require('libvirt'),
    Hypervisor = libvirt.Hypervisor;

var libvirt_socket = new Hypervisor('qemu:///system');


function connect(callback) {
    libvirt_socket.connect(function() {
        callback();
    });
}



function display (result) {
    console.log(result + '\n')
}

module.exports = {
    connect: function (callback) {
        libvirt_socket.connect(function() {
            callback();
        });
    },
    getHypervisor: function  (get_info, action_callback) {
        libvirt_socket[get_info](function (err, result) {
            action_callback(result);
        });
    }
};

var hypervisor = (function () {
    return {
        hostname: function (action_callback) {
            connect(function () {
                getHypervisor('getHostname', function (res) {
                    action_callback(res);
                })
            });
        },
        type: function () {
            connect(function () {
                getHypervisor('getType', function (res) {
                    console.log(res);
                })
            });
        },
        capabilities: function () {
            connect(function () {
                getHypervisor('getCapabilities', function (res) {
                    display(res)
                })
            });
        },
        system_info: function () {
            connect(function () {
                getHypervisor('getSysInfo', function (res) {
                    display(res)
                })
            });
        },

        version: function () {
            connect(function () {
                getHypervisor('getVersion', function (res) {
                    display(res)
                })
            });
        },
        libvirt_version: function () {
            connect(function () {
                getHypervisor('getLibVirtVersion', function (res) {
                    display(res)
                })
            });
        }
    }
})();


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
            return get_instance_info;
            console.log(get_instance_info);
        },

        start: function () {
            console.log('create vm')
        },

        destroy: function (vm_id) {
            console.log('lol')
        }


    }
})();

//hypervisor.hostname(function (res) {
//    console.log(res);
//});



//hypervisor.type();
//hypervisor.capabilities();
//hypervisor.system_info();
//hypervisor.version();
//hypervisor.libvirt_version();
//instance.list()