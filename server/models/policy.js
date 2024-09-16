const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
});

const Policy = mongoose.model("Policy", policySchema);

module.exports = Policy;
