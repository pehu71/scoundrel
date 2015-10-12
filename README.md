# scoundrel

> Simple web server for mocking AJAX responses and front end development without backend.
    For source files visit  [Istanbul] on GitHub.
    
## General purpose
Scoundrel is a simple web server for making responses to AJAX requests. This can be used for front end development without backend available, or just to try things very quickly out.
You can simply make him return status codes and responses which satisfy your needs while horsing around with your front-end stuff.
Scoundrel is **not intended for JavaScript unit testing**.

There is a possibility to run it from command line without GUI based on the `configuration script`
**or**
possibility to be operated through GUI `using web page interface` for setting up the responses

## Installation

The easiest way is to install `scoundrel` as a `devDependency`, by running

```bash
npm install scoundrel --save-dev
```

## Configuration

For configuration details see [docs/configuration](docs/configuration.md).

## Examples

#### Basic usage from command line

Just type scoundrel and the name of your configuration file. For configuration file details see [docs/configuration](docs/configuration.md).
If there is a need for it, specify full path to this file.

```bash
scoundrel path/to/config/config.js
```

For more information on Scoundrel see the [homepage].


[homepage]: http://karma-runner.github.com
[Istanbul]: https://github.com/gotwarlost/istanbul
