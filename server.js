const static = require(`node-static`);

const fileServer = new static.Server(`./dist`);

require(`http`).createServer(function (request, response) {
    request.addListener(`end`, function () {
        fileServer.serve(request, response);
    }).resume();
}).listen(9999);