module.exports=init;
function init(app) {
    app.get('/', function (req, res) {
        res.render("index.html");
    });

    app.get('/voice',function(req,res){
        res.render("voice.html");
    })
}