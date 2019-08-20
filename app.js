let express = require('express')
let router = require('./controller')

let app = express()
app.set('view engine', 'ejs')

app.use(express.static('./public'))
app.use(express.static('./uploads'))

app.get('/', router.showIndex)

app.get('/upload', router.upload)

app.get('/:albumName', router.showAlbum)

app.post('/upload', router.doUpload)

app.use((req, res)=>{
    res.render('error')
})

process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
});

app.listen(3000)