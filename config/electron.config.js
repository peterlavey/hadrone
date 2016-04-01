exports.windowConfig = ()=> {
return   {
    width: 800,
    height: 600,
    frame: true,
    resizable: true,
    fullscreen: true,
    transparent: true,
    //backgroundColor: '#000',
    icon: __dirname + '/img/icon.png'
  }
};
exports.pathStartup = ()=> 'file://' + __dirname + '/../app/index.html';
