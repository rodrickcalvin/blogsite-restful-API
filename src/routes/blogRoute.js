module.exports = (app) => {

    app.route('/')
    .get((req, res) => {
        res.send(`This is a GET method`)
    })
    
    .post((req, res) => {
        res.send(`This is the POST method`)
    })
    
    .put((req, res) => {
        res.send(`This is the PUT method`)
    })
    
    .delete((req, res) => {
        res.send(`This is the DELETE method`)
    })
}
