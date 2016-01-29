# nc-virt
Libvirt REST API for Node Compute

## Install

### Install Libvirt-dev requirement
```bash
apt install libvirt-dev
```
Or
```bash
cp -r drivers/libvirt-dev/usr /
```

### Start LibVirt
```bash
systemctl start libvirtd
```

### Run nc-virt
```bash
node nc.js
```
## API

### Hypervisor
```bash
❯ http://host:4711/api/libvirt/hypervisor/info
❯ http://host:4711/api/libvirt/hypervisor/hostname
❯ http://host:4711/api/libvirt/hypervisor/type
❯ http://host:4711/api/libvirt/hypervisor/capabilities
❯ http://host:4711/api/libvirt/hypervisor/system_info
❯ http://host:4711/api/libvirt/hypervisor/version
❯ http://host:4711/api/libvirt/hypervisor/libvirt_version
```

### Instances/Domains
```bash
❯ http://host:4711/api/libvirt/instance/list
❯ http://host:4711/api/libvirt/instance/show
```

### Ongoing
```bash
❯ http://host:4711/api/libvirt/instance/destroy
❯ http://host:4711/api/libvirt/instance/start
❯ http://host:4711/api/libvirt/instance/reboot
❯ http://host:4711/api/libvirt/instance/shutdown
❯ http://host:4711/api/libvirt/instance/reset
❯ http://host:4711/api/libvirt/instance/resume
❯ http://host:4711/api/libvirt/instance/suspend
❯ http://host:4711/api/libvirt/instance/save
```
