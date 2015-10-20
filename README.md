# Scoundrel - The true fake server

> Simple web server for mocking AJAX responses (for whatever you could need it).
    For source files visit  [Scoundrel] on GitHub.
    
## General purpose
Scoundrel is a simple web server for making responses to AJAX requests. This can be used for front end development without backend available, or just to try things very quickly out.
You can simply make him return status codes and responses which satisfy your needs while horsing around with your front-end stuff.

Scoundrel is *not intended for JavaScript unit testing* but can be used in some way of *integration testing*.

## So how it works?

*Let us imagine a simple case:* 
You are itching to start polishing your new AngularJS driven front-end, but you do not want to mess with some back-end controller to get first results. You are thinking about having some pretty valid JSON with some *customer entities* to show them in some grid component. And you want a lot of them, let's say 1000.

So just install Scoundrel, go to the config file (one which is richly commented can be found in [docs/configuration](docs/configuration.md)) and define a route:

*Define the path for the route and the method:*

````javascript
pathPattern: "/customers/list",
method: "GET"
````

*Show scoundrel the **sample** of your data entity, like this:*

````javascript
                    dataModel: {
                        CustomerId: 1756,
                        PenisLength: 3.25,
                        FirstName: "Stanley",
                        SurName: "Bourneigh",
                        Email: "stan.bon@gmail.com",
                        Phone: "(541) 754-3011",
                        Contract: {
                            Type: "CDN123",
                            Length: 3,
                            Discount: 0.15
                        },
                        Interests: [
                            1,
                            2.23,
                            'movies',
                            {
                                interestKind: 0
                            },
                            [
                                'cc', 'aa', 'bb'
                            ]
                        ]
                    }
````

*Tell Scoundrel to repeat it 1000 times and modify randomly:*

````javascript
entityCount: 1000,
modifyRandomly: true,
````

Scoundrel will try to *mimic* your data structure, or just repeat them (depends on `modifyRandomly`). If it is in its random mode, it tries to infer several types and patterns: tries to guess what is an e-mail address, phone number, what is an integer or float number and so on. Then it generates random data with corresponding types and patterns.

Then just query the server, and you'll get it back.

## Installation

The easiest way is to install `scoundrel` is by running

```bash
npm install scoundrel
```

## Configuration

For configuration details see [docs/configuration](docs/configuration.md).

## Command line usage

Scoundrel has pretty simple command line usage, it doesn't allow any combination of command line arguments, since it makes no sense in this case. You can just ask for help, version information, or simply run it with configuration javascript file as an argument.

#### Getting version info

````
scoundrel --ver
````

#### Getting help on command line usage

````
scoundrel --help
````

#### Running Scoundrel

Just type scoundrel and the name of your configuration file. For configuration file details see [docs/configuration](docs/configuration.md).
If there is a need for it, specify either full path to this file, or just the file name, if the file resides in scoundrel directory.

>If you pass no argument, Scoundrel will run with default configuration file **config.js** which should be in its root directory after installation. This is the commented one.

*Option 1* - specifying file name only, when the config file resides in scoundrel directory

```bash
scoundrel config-ex.js
```

*Option 2* - specifying full path (win32)

```bash
scoundrel c:\mydir\its_subdir\some-other-config.js
```

#### Using Scoundrel as a module

You can make Scoundrel run from your code by simply adding these two lines of code:

````javascript
var scoundrel = require('scoundrel');
scoundrel.run();
```` 
In this case the configuration file is always the file named **config.js** which is placed in the root scoundrel module directory. There is one shipped with this package. 

When you want to stop the server from your code, just call its `stop()` method like this:

````javascript
scoundrel.stop();
````

You can even pass a callback method to execute when the server is stopped by calling its `stop(callback)` method. This can be easily done by following snippet:

````javascript
var onStopCallback = function () {
    console.log('Scoundrel stopped...');
};   
scoundrel.stop(onStopCallback);
````

[Scoundrel]: https://github.com/pehu71/scoundrel
