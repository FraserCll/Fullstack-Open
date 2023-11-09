const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0
    ? 0 
    : blogs.reduce((sum, blogs) => sum + blogs.likes, 0)
}

const favouriteBlog = (blogs) => {
    return blogs.length === 0
    ? 0
    : blogs.reduce((favourite, blog) => blog.likes > favourite.likes ? blog : favourite, blogs[0] )
}

module.exports = {
    dummy, totalLikes, favouriteBlog
}