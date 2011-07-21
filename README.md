Welcome to Mojo Mobile
======================

Mojo Mobile is built on top of the [Appcelerator Titanium Mobile Project](http://appcelerator.com) and based on [Blast Mojo](http://blastmojo.com) design mentalities.

The basic flow is that Mojo.Build will invoke a model, view, and controller for the module namespace. 

Modules are designed to use the [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1) style of "var exports" to export variables to the modules global scope. Doing this allows each component of the module to access them.

The benefit of this, is it allows for each component in the name space to build dependencies at run time, and make them available for the other componets once all componets have been loaded.
 

Here is a basic example:

> Resource/app.js

``` 

  (function(){
      
    Ti.include('mojo/kernel.js');
     
    Mojo.Build([
      {
        module: 'facebook'
      }
    ]);    
    
  })();

```

This would then look inside:

* Resources/mojo/models
* Resources/mojo/views
* Resources/mojo/controllers

for .js files with the name "facebook". 