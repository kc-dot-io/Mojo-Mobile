  Ti.include('mojo/kernel.js');
  
  Mojo.Start();

  Mojo.SiteMap.Bind([
    {
      title: 'Facebook',
      titleid: 'Facebook',
      icon: 'images/Facebook.png',
      url: 'mojo/actions/facebook.js',
      backgroundColor: '#fff'
    },
    {
      title: 'Twitter',
      titleid: 'Facebook',
      icon: 'images/Twitter.png',
      url: 'mojo/actions/twitter.js',
      backgroundColor: '#fff'
    }
  ]);
    
  
