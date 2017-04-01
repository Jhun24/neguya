/**
 * Created by GrooshBene on 2017-04-01.
 */
module.exports = init;
function init(app, Report) {
    var randomString = require("randomstring");
    app.post("/report", function (req, res) {
        var report = new Report({
            _id : randomString.generate(14),
            sender : req.param("sender"),
            catcher : req.param("catcher"),
            cause : req.param("cause")
        });

        report.save(function (err, result) {
            if(err){
                console.log(err);
                throw err;
            }
            res.send(report);
        })
    })
}