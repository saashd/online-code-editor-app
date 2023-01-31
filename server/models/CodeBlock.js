const mongoose = require("mongoose");

const CodeBlockSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, unique: true},
        code: {type: String, required: true},
        description: {type: String, required: true},
        soluton: {type: String, required: true}
    },
    {timestamps: true}
);

module.exports = mongoose.model("CodeBlock", CodeBlockSchema);
