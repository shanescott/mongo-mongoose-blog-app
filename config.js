"use strict";
exports.DATABASE_URL = 
    process.env.DATABASE_URL || "mongodb://first-user:password1@ds129045.mlab.com:29045/blogapp";
exports.TEST_DATABASE_URL =
    process.env.TEST_DATABASE_URL || "mongodb://localhost/test-mongo-mongoose-blog-app";
exports.PORT = process.env.PORT || 8080;