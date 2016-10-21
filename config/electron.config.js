exports.windowConfig = ()=> {
return   {
    width: 1366,
    height: 768,
    frame: true,
    resizable: true,
    fullscreen: true,
    transparent: false,
    //backgroundColor: '#000',
    icon: __dirname + '/img/icon.png',
    iconDb: __dirname + '/img/mongodb.png',
    dirname: __dirname
  }
};
exports.pathStartup = ()=> 'file://' + __dirname + '/../dist/index.html';
