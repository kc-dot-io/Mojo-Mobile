
  Mojo.Ready('facebook','view',function(options){
    
    Ti.API.info('View got these options: ');
    Ti.API.info(options);
    
  });

  var win = Mojo.UI.makeWindow();
  
  var view = Mojo.UI.makeView({window: win}); 
  
  var label = Mojo.UI.makeLabel({
    window: win,
    color:'#999',
    text:'Facebook',
    font:{fontSize:20,fontFamily:'Helvetica Neue'},
    textAlign:'center',
    width:'auto'
  });  
  
  view.add(label);
  
  win.open();
  
  var exports = { view: view };



