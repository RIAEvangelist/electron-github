var https=require('https');

var octocats=null;

https.get(
    'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://feeds.feedburner.com/Octocats&num=100',
    function(res) {
        var body='';
        res.on(
            'data',
            function(data){
                body+=data;

            }
        );
        res.on(
            'end',
            function(data){
                octocats=JSON.parse(body).responseData.feed.entries;
            }
        );

    }
).on(
    'error',
    function(e) {
        console.log('Got error: ' + e.message);
    }
);

function pickOctocat(){
    var cat=Math.round(
        Math.random()*octocats.length
    );
    return octocats[cat];
}

module.exports=pickOctocat;
