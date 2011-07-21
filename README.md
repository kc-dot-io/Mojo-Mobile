Welcome to Mojo Mobile
======================

Mojo Mobile is built on top of the Appcelerator Titanium Mobile Project

To get started with a project look in Resources/app.js

The Mojo-esque abstraction logic of this project can be found in Resources/mojo/kernel.js

The basic flow is that Mojo.Build will invoke a model, view, and controller for the module namespace. 

Each namespace can use "var exports" to export variables to the name space's scope. Then each component can access these within their distinct Mojo.Ready call.

The benefit of this, is it allows for each component in the name space to build dependencies at run time, and make them available for the other componets once all componets have been loaded.

Example:


`  (function(){
      
    Ti.include('mojo/kernel.js');
     
    Mojo.Build([
      {
        module: 'facebook'
      }
    ]);    
    
  })();
`