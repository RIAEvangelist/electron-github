var git=require('./lib/gitRequest.js');
var octocat=require('./lib/octocat.js');
var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');

require('crash-reporter').start();

var getApp={
    id:'38069e514f10116771c3',
    secret:'89996f12845f45c3d92df1e7541bde6be790164a',
    name:'electron-git',
    note:'git-electron',
    noteURL:'http://www.diginow.it/electron-git',
    scopes:[
        'user',
        'public_repo',
        'repo',
        'repo:status',
        'gist',
        'notifications',
        'repo_deployment',
        'admin:org'
    ]
}

var user=null;

git.headers['client_id']=getApp.id;
git.headers['client_secret']=getApp.secret;

setTimeout(
    function(){
        console.log(octocat());
    },
    1500
);

function login(){
    var auth={
        username:null,
        password:null
    }

    git.setAuth(
        'basic',
        {
            username:auth.username,
            password:auth.password
        }
    );

    git.get(
        'users/'+auth.username,
        {},
        function(res){
            user=res.body;
        }
    );

    git.put(
        'authorizations/clients/'+getApp.id,
        {
            'client_secret': getApp.secret,
            scopes: getApp.scopes,
            note: getApp.note,
            'note_url': getApp.noteURL
        },
        function(res){
            //ensure latest updates
            git.update(
                'authorizations/'+res.body.id,
                {
                    scopes:getApp.scopes,
                    note:getApp.note,
                    'note_url':getApp['note_url']
                },
                function(res){
                    console.log(res);
                    //Do something
                }
            );
        }
    );
}

ipc.on(
    'asynchronous-message',
    function(event, arg) {
        console.log(arg);
        event.sender.send(
            'asynchronous-reply',
            'gotIt'
        );
    }
);

ipc.on(
    'synchronous-message',
    function(event, arg) {
        console.log(arg);
        event.returnValue = 'gotIt';
    }
);


var appWindow=null;

app.on(
    'window-all-closed',
    function() {
        if (process.platform != 'darwin') {
            app.quit();
        }
    }
);

app.on(
    'ready',
    function() {
        appWindow = new BrowserWindow(
            {
                title:'Electron GitHub',
                'accept-first-mouse':true,
                width: 640,
                height: 480,
                'min-width': 640,
                'min-height': 480,
                frame:false,
                icon:__dirname+'/img/logo-256.png',
                'text-areas-are-resizable':true
            }
        );

        appWindow.loadUrl('file://' + __dirname + '/app/app.html');

        appWindow.openDevTools();

        appWindow.on(
            'closed',
            function() {
                appWindow=null;
            }
        );
    }
);
