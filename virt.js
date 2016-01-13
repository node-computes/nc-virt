'use strict';

var libvirt = require('libvirt'),
    Hypervisor = libvirt.Hypervisor,
    h = require('./helpers/helper');

var compute = {};

var version = h.getLibVirtVersion().then(function(version) {
    console.log('LibVirt Version: ' + version);
});


compute.hypervisor = new Hypervisor('qemu:///system');
console.log('URI: ' + compute.hypervisor.uri);

compute.hypervisor.connect();

compute.type = compute.hypervisor.getHostname();
compute.hypervisor.lookupDomainById(24, function(err, domain) {
    //console.log(err);
    console.log(domain);
    //console.log(domain._parent);
});

compute.vm_list = compute.hypervisor.getAllDomains().then(function () {
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
console.log('Type: ' + compute.type);
console.log('Hostname: ' + compute.hypervisor.getHostname());
console.log('VM List: ' + compute.vm_list);

var capabilities = compute.hypervisor.getCapabilities();
console.log('Capabilities: ' + capabilities);


compute.hypervisor.disconnect();
