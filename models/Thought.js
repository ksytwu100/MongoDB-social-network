const mongoose = require("mongoose");
const { Schema, Types } = mongoose; // Add Types to the destructuring assignment
const reactionschema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(), // Ensure default value is set
    },
    reactionBody: {
      type: String,
      required: (true, "You need to leave a reaction!"),
      maxlength: 280,
    },
    username: {
      type: String,
      required: (true, "You need to leave a username!"),
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) =>
        timestamp.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
    },
  },
  {
    _id: false, // This tells Mongoose not to add the default _id field
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) =>
        timestamp.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionschema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
const Thought = mongoose.model("Thought", thoughtSchema);
module.exports = Thought;
