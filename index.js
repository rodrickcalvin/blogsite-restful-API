var express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./src/routes/blogRoute')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/test', {
    userNewUrlParser: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const BlogSchema = require('./src/models/blogModel');

app.post('/newBlog', (req, res) => {
    let blog = new BlogSchema(req.body);
    blog.save((err, BlogSchema) => {
        if(err){
            res.send(err);
        }
        res.json(blog);
    })
})

// get items stored in the db

let getAllBlogs = (req, res) => {
    BlogSchema.find({}, (err, blogs) => {
        if(err) {
            res.send(err);
        }
        res.json(blogs);
    })
}

app.get('/getBlogs', getAllBlogs);

// get objects by ID
let getBlogByID = (req, res) => {
    BlogSchema.findById((req.params.blog_Id), (err, blog) => {
        if(err) {
            res.send(err);
        }
        res.json(blog);
    })
}

app.get('/blog/:blog_Id', getBlogByID);

// endpoint to update database
let updateBlog = (req, res) => {
    BlogSchema.findOneAndUpdate(
        {_id: req.params.blog_Id},
        req.body,
        {new: true},
        (err, updateBlog) => {
            if(err) {
                res.send(err);
            }
            res.json(updateBlog);
        })
}

app.put('/blog/:blog_Id', updateBlog);

// Endpoint for Deleting Data
let deleteBlog = (req, res) => {
    BlogSchema.remove(
        {_id: req.params.blog_Id},
        (err, blog) => {
            if (err){
                res.send(err);
            }
            res.json({message: 'Blog Deletion Successful'})
        })
}

app.delete('/blog/:blog_Id', deleteBlog)

// Serve static Files
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
});