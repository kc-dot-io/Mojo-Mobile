  var Mojo = {};
  
  /*
   * Core Mojo
   */
  
  Mojo.Start = function()
  {    
    Titanium.UI.setBackgroundColor('#000');
    
    Mojo.root_win = Titanium.UI.createWindow({
      className: 'root_win'
    });

    return Mojo;
  };

   
  Mojo.Build = function( /*array of objects*/ map )
  {
        
    Mojo.Start();

    var models = Object();
    var views = Object();    
    var controllers = Object();
    
    for(var i=0; i<map.length; i++)
    {
      models[ map[i].module ] = require ( 'mojo/models/'+map[ i ].module+'.js' );
    }
    
    for(var i=0; i<map.length; i++)
    {
      views[ map[i].module ] = require ( 'mojo/views/'+map[ i ].module+'.js' );
    }
        
    for( var i=0; i<map.length; i++ )
    {
      controllers[ map[i].module ] = require ( 'mojo/controllers/'+map[ i ].module+'.js' );
    }      
        
    Mojo.Model._models = models;
    Mojo.View._views = views;
    Mojo.Controller._controllers = controllers;
    
    Mojo.SiteMap.Complete();
    
  }; 
    
  Mojo._callbacks = Object();
  
  Mojo.Ready = function( /* string */ name, /* string */ type, /* function */ callback )
  {
    Ti.API.info('adding callback: '+name+'_'+type);
    
    Mojo._callbacks[name+'_'+type] = callback; 
  };
  
  Mojo.Observe = function( /* string */ name, /* string */ type, /* function */ callback)
  {
    Ti.API.info('adding callback: '+name+'_'+type);
    
    Ti.App.addEventListener(name+'_'+type, callback);
  };
  
  Mojo.Fire = function( /* string */ name, /* string */ type, /* object */ data )
  {
    Ti.App.fireEvent(name+'_'+type, data);
  };
  
  /*
   * Mojo SiteMap
   */
  
  Mojo.SiteMap = {};  
  
  Mojo.SiteMap.Complete = function( /*object*/ )
  {
    Ti.API.info('Ready to fire callbacks:');
    
    for(var name in Mojo._callbacks)
    {      
      if( typeof(Mojo._callbacks[name]) == 'function' )
      { 
        
        var module = name.split('_');
        module = module[0];
        
        Ti.API.info('Firing callback: '+name);    
        
        Mojo._callbacks[name].apply(Mojo.Controller._controllers[module],[{ 
          model: Mojo.Model._models[module],
          view: Mojo.View._views[module],
          controller: Mojo.Controller._controllers[module]
        }]);
        
      }
    }
  };
  
  /*
   * Mojo Model
   */
  
  Mojo.Model = {};
  Mojo.Model._models = null;
  
  /*
   * Mojo View
   */
  
  Mojo.View = {};
  Mojo.View._views = null;
  
  /*
   * Mojo Controller
   */
  
  Mojo.Controller = {};
  Mojo.Controller._controllers = null;  
  
  /*
   * Mojo UI
   */
  
  Mojo.UI = {};
  
  Mojo.UI.makeWindow = function( /*object*/ options )
  {
    options = options || {};
    
    var win = Titanium.UI.createWindow(options);
    
    return win;
    
  };
  
  Mojo.UI.makeTabGroup = function( /*array of objects*/ tabs )
  {
    
    Mojo.tab_group = Titanium.UI.createTabGroup(); 
    
    for( var i=0; i<tabs.length; i++ )
    {
      Mojo.tab_group.addTab( Mojo.SiteMap.add( tabs[ i ] ) );
    }  
    
    Mojo.tab_group.open();
    
    return Mojo.tab_group;
        
  };
  
  Mojo.UI.makeTab = function( /*object*/ options )
  {
  
    options = options || {};
    
    var win = options.window || Titanium.UI.createWindow(options);
    
    options.window = win;
    
    var tab = Titanium.UI.createTab(options);
    
    return tab;
    
  };

  Mojo.UI.makeView = function( /*object*/ options )
  {
    
    options = options || {};
           
    var view = Titanium.UI.createView(options);

    var win = options.window || Titanium.UI.currentWindow;
    
    win.add(view); 
    
    return view;
    
  };
  
  Mojo.UI.makeLabel = function( /*object*/ options )
  {
    
    options = options || {};
    
    var label = Titanium.UI.createLabel(options);
    
    return label;
    
  };

  var require = function(filename) {
    
    Ti.include(filename);
    
    return exports;
    
  };
  