Welcome to Mojo Mobile
======================

Mojo Mobile is built on top of the [Appcelerator Titanium Mobile Project](http://appcelerator.com) and based on [Blast Mojo](http://blastmojo.com) design mentalities.

All Mojo Mobile apps start with Mojo.Build. It will will invoke a model, view, and controller for each module namespace. 

Modules are designed to use the [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1) style of "var exports" to export variables to the modules global scope. Doing this allows each separate component of the module to access them. The benefit here is that it allows for each component in the name space to build dependencies at run time and then share them with the other componets once all componets have been loaded.

Here is a basic example of execution logic:

> Resources/app.js

```javascript 

  (function(){
      
    Ti.include('mojo/kernel.js');
     
    Mojo.Build([
      {
        module: 'demo'
      }
    ]);    
    
  })();

```

This would then look inside:

* Resources/mojo/models
* Resources/mojo/views
* Resources/mojo/controllers

for .js files with the name "demo". 

> Resources/mojo/models/demo.js

```javascript 

  var exports = { 
    i18n: { label: 'I18N: Facebook' }    
  }; 

  Mojo.Ready('demo','model',function(options){
    
    Mojo.Log('Model got these options: ');
    Mojo.Log(options);
    
  });


```

Here you see that the exports variable defines some simple localized data for a label. We can also define a callback for this model via Mojo.Ready that helps you to access the exports for each component of the module - once they have loaded.

> Resources/mojo/views/demo.js

```javascript   
  
  var exports = { };

  Mojo.Ready('demo','view',function(options){
    
    Mojo.Log('View got these options: ');
    Mojo.Log(options);
    
    var win = Mojo.UI.makeWindow();
    
    var view = Mojo.UI.makeView({window: win}); 
    
    var label = Mojo.UI.makeLabel({
      window: win,
      color:'#999',
      text: options.model.i18n.label,
      font:{fontSize:20,fontFamily:'Helvetica Neue'},
      textAlign:'center',
      width:'auto'
    });  
    
    view.add(label);
        
    win.open();
  
    view.addEventListener('click',function(){
      Mojo.Fire('demo','controller',{ data: { action: 'doSomething' } });
    });
    
    Mojo.Observe('demo','controller_callback',function(response){
      Mojo.Log('Controller repsonded with: ');
      Mojo.Log(response.data);
    });
    
  });
 

```

In the view, you can see that we wait until the callback is invoked to build our interface. The reason for this is that most of the time we need access to the data scheme (options.model.data) in order to dynamically build the view. Later in the callback we add a standard click event listener which uses Mojo.Fire to send a message to the controller with some data.

> Resources/mojo/controllers/demo.js

```javascript 

  var exports = { }; 
  
  Mojo.Ready('demo','controller',function(options){
    
    Mojo.Log('Sitemap is ready');
    Mojo.Log('Controller got these options: ');
    Mojo.Log(options);
  
    Mojo.Observe('demo','controller',function(options){
      
      Mojo.Log('The Controller got these options from the view observer on click');
      Mojo.Log(options);
      
      //Do Something with the Model
      
      Mojo.Fire('demo','controller_callback',{ data: 'Controller says Hi' });
    });  
    
  });
   

```

Lastly we have the controller. Generally the controller is the last callback to be invoked. This makes it a perfect place to use Mojo.Observe which will listen to application wide events and pass data similar to Mojo.Messaging.getTopic in Blast Mojo. Mojo.Observe can be then used to consult the data and fire information back to the view so it can update the presentation.