  
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
      Mojo.Fire('facebook','controller',{ data: { action: 'doSomething' } });
    });
    
    Mojo.Observe('facebook','controller_callback',function(response){
      Ti.API.info('Controller repsonded with: ');
      Ti.API.info(response.data);
    });
    
  });
