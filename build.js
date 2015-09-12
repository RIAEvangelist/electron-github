var packager = require('electron-packager');

var options={
    dir:__dirname+'/src/',
    name:'Electron GitHub & GitHub Enterprise Desktop Client',
    all:true,
    version:'0.32.0',
    out:'./build/',
    'app-bundle-id':'it.diginow.electrongit',
    'app-version':'0.0.1',
    overwrite:true,
    icon:__dirname+'/src/img/logo-256.png',
    'version-string':{
        CompanyName:'digiNow inc.',
        ProductVersion:'0.0.1',
        ProductName:'Electron GitHub & GitHub Enterprise Desktop Client'
    }
}

console.log(options);

packager(
    options,
    function done (err, appPath) {
        console.log(err,appPath)
    }
);
