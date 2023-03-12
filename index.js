const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path')

const app = express();
const port = 4000

// 
const multer = require('multer')

// setup file storage
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

// 
app.use(bodyParser.json()) //type JSON
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(multer({ storage: fileStorage, fileFilter }).single('image'))

// 
const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');

// corse police
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

// 
app.use('/v1/auth', authRoutes);
app.use('/v1/blog', blogRoutes);

// 
app.use((error, req, res, next) => {
    const status = error.errorStatus || 500
    const message = error.message
    const data = error.data

    res.status(status).json({ message, data })
})



// mongoose
const uri = 'mongodb+srv://paozan:22M.Mongodb.com@cluster0.vxbza3t.mongodb.net/blog?retryWrites=true&w=majority'
mongoose.connect(uri)
    .then(() => {
        app.listen(port, () => console.log(`listen port ${port}`));
    })
    .catch(err => console.log(err))