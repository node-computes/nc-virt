
var libvirt = require('libvirt'),
    Hypervisor = libvirt.Hypervisor,
    h = require('./helpers/helper');

h.getLibVirtVersion().then(function(version) {
    console.log('LibVirt Version: ' + version);
});

var connection = new Hypervisor('qemu:///system');
connection.connect(function() {

    const hostname = connection.getHostname();
    console.log(hostname);

    connection.lookupDomainById(24, function(err, domain) {
        //console.log(err);
        var domain = domain;
        console.log(domain);
        //console.log(domain._parent);
    });

    console.log('Type: ' + connection.type);
    console.log('Hostname: ' + connection.getHostname());
    console.log('VM List: ' + connection.vm_list);

    var capabilities = connection.getCapabilities();
    console.log('Capabilities: ' + capabilities);

    connection.vm_list = connection.getAllDomains().then(function () {
            var self = this;
            return Promise.join([ this.listDefinedDomainsAsync(), this.listActiveDomainsAsync()
                ])
                .spread(function(defined, active) { return defined.concat(active); })
                .spread(function(defined, active) {
                    return Promise.all([
                        Promise.map(defined, function(domain) { return self.lookupDomainByNameAsync(domain); }),
                        Promise.map(active, function(domain) { return self.lookupDomainByIdAsync(domain); })
                    ]);
                })
                .spread(function(defined, active) { return defined.concat(active); });
        }
    );

});

connection.disconnect();
