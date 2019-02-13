"use strict";

const mongoose = require("mongoose");



const authorSchema = mongoose.Schema({
    firstName: 'string',
    lastName: 'string',
    userName: {
        type: 'string',
        unique: true
    }
});

const commentSchema = mongoose.Schema({ content: 'string' });

const postSchema = mongoose.Schema({
    title: 'string',
    content: 'String',
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Authors' },  
    comments: [commentSchema] 
});


postSchema.pre('find', function(next) {
    this.populate('author');
    next();
  });

postSchema.pre('findOne', function(next) {
    this.populate('author');
    next();
    });

  postSchema.virtual("authorName").get(function () {
    return `${this.author.firstName} ${this.author.lastName}`.trim();
});

postSchema.methods.serialize = function() {
    return {
        id: this._id,
        author: this.authorName,
        content: this.content,
        title: this.title,
        comments: this.comments      
    };
};

 





const Posts = mongoose.model("Posts", postSchema);
const Authors = mongoose.model("Authors", authorSchema);

module.exports = { Posts, Authors };
