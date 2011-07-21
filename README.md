Welcome to Mojo Mobile
======================

Mojo Mobile is built on top of the [Appcelerator Titanium Mobile Project](http://appcelerator.com) and based on [Blast Mojo](http://blastmojo.com) design mentalities.

The basic design patter that Mojo follows starts with Mojo.Build. It will will invoke a model, view, and controller for each module namespace. 

Modules are designed to use the [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1) style of "var exports" to export variables to the modules global scope. Doing this allows each separate component of the module to access them.

The benefit of this, is it allows for each component in the name space to build dependencies at run time, and make them available for the other componets once all componets have been loaded.

Here is a basic example of execution logic:

> Resources/app.js

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

> Resources/mojo/models/facebook.js

```

  var exports = { 
    i18n: { label: 'I18N: Facebook' }    
  }; 

  Mojo.Ready('facebook','model',function(options){
    
    Ti.API.info('Model got these options: ');
    Ti.API.info(options);
    
  });


```

Here you see that the exports variable defines some simple localized data for a label. 

We can also defined a callback for this model via Mojo.Ready that provides all data defined by each component of the module to this context.

> Resources/mojo/views/facebook.js

```  
  var exports = { };

  Mojo.Ready('facebook','view',function(options){
    
    Ti.API.info('View got these options: ');
    Ti.API.info(options);
    
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
      Mojo.Fire('facebook','click',{ data: 'test' })
    });
    
  });
 

```

In the view, you can see that we wait until the callback is invoked to build our interface. 

The reason for this is that most of the time we need access to the data scheme (options.model.data) in order to dynamically build the view.

> Resources/mojo/controllers/facebook.js

```
  var exports = { }; 
  
  Mojo.Ready('facebook','controller',function(options){
    
    Ti.API.info('Sitemap is ready');
    Ti.API.info('Controller got these options: ');
    Ti.API.info(options);
  
    Mojo.Observe('facebook','click',function(options){
      Ti.API.info('The Controller got these options from the view observer on click');
      Ti.API.info(options);
    });  
    
  });
  

```

Lastly we have the controller. Generally the controller is the last callback to be invoked.

This makes it a perfect place to use Mojo.Observe which will listen to application wide events and pass data similar to Mojo.Messaging.getTopic in Blast Mojo.