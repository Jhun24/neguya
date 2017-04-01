/**
 * Created by GrooshBene on 2017-04-01.
 */
module.exports = init;
function init(app, Event) {
    var randomString = require('randomstring');
    app.post("/event/add", function (req, res) {
        var event = new Event({
            _id : randomString.generate(14),
            date : req.param('date'),
            startTime : req.param('startTime'),
            finishTime : req.param('finishTime'),
            content : req.param('content')
        });
        event.save(function (err, result) {
            if(err){
                console.log(err);
                throw err;
            }
            res.send(event);
        })
    });

    app.post("/event/find", function (req, res) {
        Event.find({date : req.param('date')}, function (err, result) {
            if(err){
                throw err;
            }
            res.send(200, result);
        });
    });

    app.post("/event/delete", function (req, res) {
        Event.findOneAndRemove({_id : req.param('id')}, function (err, result) {
            if(err){
                throw err;
            }
            res.send({"result" : 1});
        })
    })
}