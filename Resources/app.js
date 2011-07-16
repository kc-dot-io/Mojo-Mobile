  Ti.include('mojo/kernel.js');
  
  Mojo.Start();

  Mojo.SiteMap.Bind([
    {
      title: 'Facebook',
      titleid: 'Facebook',
      icon: 'images/Facebook.png',
      url: 'mojo/controllers/facebook.js',
      backgroundColor: '#fff'
    },
    {
      title: 'Twitter',
      titleid: 'Facebook',
      icon: 'images/Twitter.png',
      url: 'mojo/controllers/twitter.js',
      backgroundColor: '#fff'
    }
  ]);
    
  
