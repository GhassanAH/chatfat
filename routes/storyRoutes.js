const mongoose = require('mongoose')
const Blog = mongoose.model('blogs')



module.exports = (app) => {

    app.post('/api/post_blog', async (req,res) => {
        if(!req.user){
            return res.status(500).send({message:"falid to post a blog", success:false})
        }
        const {title, content, imageUrl, videoUrl } = req.body
        const blog = await new Blog({
            title:title,
            content:content,
            imageUrl:imageUrl,
            videoUrl:videoUrl,
            _user:req.user.id
            })
        blog.save()
        return res.status(200).send({message:"successfully uploaded", success:true})
    })




    app.get('/api/blogs', async (req,res) => {
        if(!req.user){
            return res.status(500).send({message:"falid to post a blog", success:false})
        }
        const blogs = await Blog.find({_user: req.user.id})

        return res.status(200).send({blogs:blogs, message:"successfully fetched", success:true})
    })



    
    app.get('/api/getBlogById/:id', async (req,res) => {
        if(!req.user){
            return res.status(500).send({message:"falid to post a blog", success:false})
        }
        const id = req.params.id
        const blogs = await Blog.find({_id: id})
        return res.status(200).send({blogs:blogs, message:"successfully fetched", success:true})
    })





    app.post('/api/updateBlog', async (req,res) => {
        if(!req.user){
            return res.status(500).send({message:"falid to update the blog", success:false})
        }
        const {id, title, content, imageUrl, videoUrl} =  req.body
        const blog = await Blog.findById({_id: id})
        if(blog){
            blog.title = title
            blog.content = content
            blog.imageUrl = imageUrl
            blog.videoUrl = videoUrl
            blog.createdAt = Date.now()
            blog.save()
            return res.status(200).send({message:"successfully updated", success:true})
        }
        return res.status(400).send({message:"falid to update the blog", success:false})
       

    })




    app.delete("/api/delete_blog/:id", async (req,res) => {
        const id = req.params.id
        if(!id){
            return res.status(500).send({message:"Not successfully deleted", success:false})
        }
        return await Blog.deleteOne({_id:id}, (err) => {
            if(err){
                return res.status(400).send({message:"Not successfully deleted", success:false})
            }else{
                return res.status(200).send({message:"successfully deleted", success:true})
            }
        }).clone()

    })
    
}