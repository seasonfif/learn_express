/*
router模块
 */

let file = require('../models/file')
let formidable = require('formidable')
let sd = require('silly-datetime')
let path = require('path')

exports.showIndex = (req, res)=>{
    file.getAllAlbums((err, albums)=>{
        if (err){
            res.render('error')
        }else{
            res.render('index', {'albums' : albums})
        }
    })
}

exports.showAlbum = (req, res)=>{
    var name = req.params.albumName
    file.getAlbumByName(name, (err, images)=>{
        if (err){
            res.render('error')
        }else{
            res.render('albums', {
                'albumName':name,
                'images':images
            })
        }
    })
}

exports.upload = (req, res)=>{
    file.getAllAlbums((err, albums)=>{
        if (err){
            res.render('error')
        }else{
            res.render('upload', {'albums' : albums})
        }
    })
}

exports.doUpload = (req, res)=>{

    var form = new formidable.IncomingForm()
    form.encoding = 'utf-8'
    form.uploadDir = path.normalize(__dirname + '/../tempup')
    form.keepExtensions = true
    var file_list = []

    /*form.on('file', (field, file)=> {
        file_list.push([field, file])
    })*/

    form.parse(req, (err, fields, files)=>{
        console.log(fields)
    })

    /*file.uploadFileToPath(req, (err)=>{
        if (err){
            res.render('error')
        }
    })*/
}