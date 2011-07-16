  Ti.include('../kernel.js');

  var view = Mojo.UI.makeView(); 
  
  var label = Mojo.UI.makeLabel({
    color:'#999',
    text:'Facebook',
    font:{fontSize:20,fontFamily:'Helvetica Neue'},
    textAlign:'center',
    width:'auto'
  });  
  
  view.add(label);
