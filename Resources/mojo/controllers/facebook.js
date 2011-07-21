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
  
 
  


