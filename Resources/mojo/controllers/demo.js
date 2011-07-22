  var exports = { }; 
  
  Mojo.Ready('demo','controller',function(options){
    
    Ti.API.info('Sitemap is ready');
    Ti.API.info('Controller got these options: ');
    Ti.API.info(options);
  
    Mojo.Observe('demo','controller',function(options){
      
      Ti.API.info('The Controller got these options from the view observer on click');
      Ti.API.info(options);
      
      //Do Something with the Model
      
      Mojo.Fire('demo','controller_callback',{ data: 'Controller says Hi' });
    });  
    
  });
  
 
  


