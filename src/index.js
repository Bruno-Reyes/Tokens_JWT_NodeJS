const app = require('./app')
require('./database')
function init() {
    let port = 4000
    app.listen(port,() => console.log(`Server on port ${port}`))
}

init()