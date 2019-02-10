"use strict";

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: {type: String, required: true},
    author: {
        firstName: String,
        lastName: String
    },   
});

postSchema.virtual("fullName").get(function () {
    return this.author.firstName + ' ' + this.author.lastName;
});

postSchema.methods.serialize = function () {
    return {
        id: this._id,
        title: this.title,
        content: this.content,
        author: this.fullName
    };
};

const Posts = mongoose.model("Posts", postSchema);

module.exports = { Posts };