https=require('https');
querystring=require('querystring');

var config = {
    hostname: 'api.github.com',
    port: 443,
    basePath: '/', //ghe may need api/v3/ or something,
    queryData:null,
    headers: {
        'X-GitHub-OTP': 'two-factor-code',
        'content-type':'application/json; charset=utf-8',
        'user-agent':'git-node-api'
    }
};

function setAuth(type,data){
    switch (type) {
        case "oauth":
            config.headers.authorization = null;
            if (data.token) {
                config.queryData['access_token']=data.token;
            } else {
                config.queryData['client_id']=data.id;
                config.queryData['client_secret']=data.secret;
            }

            config.queryData=querystring.stringify(config.queryData);

            break;
        case "basic":
            config.queryData=null;
            basic = new Buffer(data.username + ":" + data.password).toString("base64");
            config.headers.authorization = 'Basic ' + basic;
            break;
        default:
            break;
    }
}

function post(path,data,callback){
    config.method='POST';
    prepRequest(path,data,callback);
}

function get(path,data,callback){
    config.method='GET';
    prepRequest(path,data,callback);
}

function put(path,data,callback){
    config.method='PUT';
    prepRequest(path,data,callback);
}

function deleteReq(path,data,callback){
    config.method='DELETE';
    prepRequest(path,data,callback);
}

function update(path,data,callback){
    config.method='PATCH';
    prepRequest(path,data,callback);
}

function prepRequest(path,data,callback){
    config.path=config.basePath+path;

    if(config.queryData){
        if(config.path.indexOf('?')<0){
            config.path+='?';
        }
        config.path+=config.queryData;
    }

    var data = JSON.stringify(data);

    config.headers['content-length']=data.length;

    request(data,callback);
}

function request(data,callback){
    var body='';

    var req = https.request(
        config,
        function(res) {
            res.setEncoding('utf8');

            res.on(
                'data',
                function (chunk) {
                    body+=chunk;
                }
            );

            if(callback){
                res.on(
                    'end',
                    function(){
                        try{
                            body=JSON.parse(body);
                        }catch(err){
                            //it's not JSON
                        }

                        callback(
                            {
                                headers:res.headers,
                                body:body,
                                statusCode:res.statusCode
                            }
                        );
                    }
                );
            }

        }
    );

    req.on(
        'error',
        function(e) {
            console.log('problem with request: ' + e.message);
        }
    );

    req.write(data);
    req.end();
}

module.exports={
    setAuth:setAuth,
    headers:config,
    get:get,
    post:post,
    put:put,
    update:update,
    delete:deleteReq
}
