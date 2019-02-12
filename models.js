"use strict";

const mongoose = require("mongoose");



const authorschema = mongoose.Schema({
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
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },  
    comments: [commentSchema] 
});

postSchema.virtual("authorName").get(function () {
    return `${this.author.firstName} ${this.author.lastName}`.trim();
});

postSchema.methods.serialize = function() {
    return {
        id: this._id,
        title: this.title,
        content: this.content,
        author: this.authorName
    };
};

const Posts = mongoose.model("Posts", postSchema);
const Author = mongoose.model('Author', authorSchema);

module.exports = { Posts, Author };