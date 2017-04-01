/**
 * Created by GrooshBene on 2017-04-01.
 */
module.exports = init;
function init(app, fb) {
    var socket_io = require("socket.io");
    var io = socket_io();
    var fs = require("fs");
    var credentials = {email : "wltn000129@gmail.com", password:"wltn1029"};
    fb(credentials, function (err, api) {
        if(err) throw err;
        fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
    });
    app.io = io;
    // fb({email : "wltn000129@gmail.com", password: "wltn1029"}, function (err, api) {
    //     api.setOptions({listenEvents : true});
    //     api.listen(function (err, event) {
    //         switch (event.type){
    //             case "message":
    //                 console.log(event.body);
    //                 app.io.emit(event.body);
    //         }
    //     })
    // });
    app.post("/send", function (req, res) {
        fb({appState : JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, function (err, api) {
            if(err){
                throw err;
            }
            var id = 774247622739038;
            var msg = {body : req.param("message")};
            api.sendMessage(msg, id);
            api.setOptions({listenEvents: true});
            api.setOptions({listenEvents : true});
            var _promise = function (param) {
                return new Promise(function (resolve, reject) {
                    if(param){
                        api.listen(function (err, event) {
                            // switch (event.type){
                            //     case "message":
                                    console.log(event.body);
                            //         app.io.on('connection', function (socket) {
                            //             console.log("Connected");
                            //             socket.emit("message", event.body);
                            //         })
                            // }
                            // res.send(event.body);
                            resolve(event.body);
                        });
                    }
                    else{
                        reject(Error("Promise Wrong"));
                    }
                })
            }
            _promise(true).then(function (text) {
                res.send(text);
            }, function (err) {
                console.log(err);
            });
        })
    })

}