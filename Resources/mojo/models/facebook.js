  
  Mojo.Ready('facebook','model',function(options){
    
    Ti.API.info('Model got these options: ');
    Ti.API.info(options);
    
  });
  
  var exports = { 
    data:[
      {
       name: 'test' 
      },
      {
       name: 'test2'
      }
    ]
  }; 

