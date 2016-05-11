exports.windowConfig = ()=> {
return   {
    width: 1366,
    height: 768,
    frame: true,
    resizable: true,
    fullscreen: false,
    transparent: true,
    //backgroundColor: '#000',
    icon: __dirname + '/img/icon.png',
    dirname: __dirname
  }
};
exports.pathStartup = ()=> 'file://' + __dirname + '/../app/index.html';
