const config = require('./utils/config')
const app = require('./app')

app.listen(config.PORT, () => console.log(`Server is now running at port:${config.PORT}`))