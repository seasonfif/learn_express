/*
文件操作模块
 */
let fs = require('fs')
let formidable = require('formidable')
let sd = require('silly-datetime')
let path = require('path')
let util = require('util')

exports.getAllAlbums = (callback)=>{
    fs.readdir('./uploads', (err, files)=>{
        if (err){
            callback('文件夹找不到：uploads/', null)
            return;
        }
        var albums = [];
        (function iterator(i) {
            fs.stat('./uploads/' + files[i], (err, stat)=>{
                if (i==files.length){
                    callback(null, albums)
                    return;
                }
                if (err){
                    callback(err, null)
                }else{
                    if (stat.isDirectory()){
                        albums.push(files[i])
                    }
                }
                iterator(i+1)
            })
        })(0)
    })
}

exports.getAlbumByName = (albumName, callback)=>{
    var path = './uploads/' + albumName
    fs.readdir(path, (err, files)=>{

        if (err){
            callback('未找到相册：'+albumName, null)
        }else{
            var images = [];
            (function iterator(i) {
                fs.stat(path + '/' + files[i], (err, stat)=>{
                    if (i==files.length){
                        callback(null, images)
                        return;
                    }
                    if (err){
                        callback(err, null)
                    }else{
                        if (stat.isFile()){
                            images.push(files[i])
                        }
                    }
                    iterator(i+1)
                })
            })(0)
        }
    })
}

exports.uploadFileToPath = (req, callback)=>{
    var form = new formidable.IncomingForm()
    form.encoding = 'utf-8'
    form.uploadDir = path.normalize(__dirname + '/../tempup')
    form.keepExtensions = true
    var file_list = []

    form.on('file', (field, file)=> {
        file_list.push([field, file])
    })

    form.parse(req, (err, fields, files)=>{
        console.log(fields)

        var ran = parseInt(Math.random() * 89999 + 10000)
        file_list.forEach((value, index, array)=>{
            // console.log(util.inspect({value: value, index: index}))
            var file = value[1]
            var file_name = file.name
            var ttt = sd.format(new Date(), 'YYYYMMDDHHmmss')
            var file_path = file.path
            var old_path = file_path
            var new_path = __dirname  + '/../uploads/' + ttt + '_' +ran + '_' +file_name
            fs.rename(old_path, new_path, (err)=>{
                if (err){
                    console.error(err)
                }else{
                    console.log('receive&rename success:'+ file_name +'\n\n')
                }
            })
        })
    })
}