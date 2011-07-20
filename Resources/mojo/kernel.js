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
  
  /*
   * Mojo SiteMap
   */
  
  Mojo.SiteMap = {};   
  Mojo.SiteMap.Bind = function( /*array*/ tabs )
  {
    Mojo.tab_group = Titanium.UI.createTabGroup(); 
    
    for( var i=0; i<tabs.length; i++ )
    {
      Mojo.tab_group.addTab( Mojo.SiteMap.add( tabs[ i ] ) );
    }  
    
    Mojo.tab_group.open();
    
    return Mojo.tab_group;
    
  }; 
  
  Mojo.SiteMap.add = function( /*object*/ options )
  {
    return Mojo.UI.makeTab( options )
  };
  
  Mojo.Model = {};
  
  Mojo.Controller = {};
  
  Mojo.View = {};
  
  /*
   * Mojo UI
   */
  
  Mojo.UI = {};
  Mojo.UI.makeTab = function( /*object*/ options )
  {
  
    options = options || {};
    
    var win = Titanium.UI.createWindow(options);
    
    options.window = win;
    
    var tab = Titanium.UI.createTab(options);
    
    return tab;
  };

  Mojo.UI.makeView = function( /*object*/ options )
  {
    
    options = options || {};
           
    var view = Titanium.UI.createView(options);
    
    Ti.API.info(Titanium.UI.currentWindow);
    
    Titanium.UI.currentWindow.add(view);
    Titanium.UI.currentWindow.addEventListener('focus', function()
    {
      Ti.API.info(Titanium.UI.currentWindow);
    });  
    
    return view;
    
  };
  
  Mojo.UI.makeLabel = function( /*object*/ options )
  {
    
    options = options || {};
    
    var label = Titanium.UI.createLabel(options);
    
    return label;
  };
