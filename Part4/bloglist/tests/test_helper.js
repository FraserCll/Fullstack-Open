const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "EP 127: Maddie",
        author: "Jack Rhysider",
        url: "https://darknetdiaries.com/episode/127/",
        likes: 0
    },
    {
        title: "testTitleUpdated",
        author: "Tester Update",
        url: "https://www.google.com/images",
        likes: 1
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}