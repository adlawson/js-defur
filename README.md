# Defur #

<img src="http://stream1.gifsoup.com/view/247584/family-guy-care-bear-suicide-o.gif" alt="Defur" align="right" />

**Version:** *0.1.0*<br/>
**Master build:** [![Master branch build status][travis-master]][travis]


This library makes it easy to defer the construction or execution of a service until it's needed.
It can be installed in whichever way you prefer, but I recommend [NPM][npm].<br/>
[![NPM][nodeico]][npm]


### Basic usage ###
```js
var defur = require('defur');
var http = require('http'); // Just using HTTP as an example
var services = {};

// Defer construction
defur('server', services, function() {
    return http.createServer().listen(3000);
});

// Use the service
services.server.on('request', function() {});

// Service is only created once
services.server === services.server // true
```


### Contributing ###
I accept contributions to the source via Pull Request,
but passing unit tests must be included before it will be considered for merge.
```bash
$ make install
$ make tests
```

If you have [Vagrant][vagrant] installed, you can build the dev environment to assist development.
The repository will be mounted in `/srv`.
```bash
$ vagrant up
$ vagrant ssh

Welcome to Ubuntu 12.04 LTS (GNU/Linux 3.2.0-23-generic x86_64)
$ cd /srv
```


### License ###
The content of this library is released under the **MIT License** by **Andrew Lawson**.<br/>
You can find a copy of this license at http://www.opensource.org/licenses/mit or in [`LICENSE`][license]


<!-- Links -->
[travis]:        https://travis-ci.org/adlawson/defur
[travis-master]: https://travis-ci.org/adlawson/defur.png?branch=master
[npm]:           https://npmjs.org/package/defur
[nodeico]:       https://nodei.co/npm/defur.png
[vagrant]:       http://vagrantup.com
[license]:       /LICENSE
