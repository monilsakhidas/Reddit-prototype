// Created by Priyansh Patel on 04/24

const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const { Schema } = mongoose;

// Comments Schema
const commentSchema = new Schema(
  {
    parent_id: {
      type: mongoose.ObjectId,
    },
    depth: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Posts Schema
const postSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["text", "image", "link"],
      trim: true,
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
    numberOfComments: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
    },
    comments: [commentSchema],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    community: {
      type: Schema.Types.ObjectId,
      ref: "community",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
postSchema.plugin(aggregatePaginate);
const Post = mongoose.model("post", postSchema, "posts");
module.exports = Post;
