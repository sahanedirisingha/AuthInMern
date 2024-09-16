const express = require("express");
const router = express.Router();
const Policy = require("../models/policy");

// Create a new policy
router.post("/add", async (req, res) => {
    try {
        const { name, description } = req.body;
        const policy = new Policy({ name, description });
        await policy.save();
        res.status(201).send(policy);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Get all policies
router.get("/", async (req, res) => {
    try {
        const policies = await Policy.find();
        res.status(200).send(policies);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update a policy by ID
router.put("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const policy = await Policy.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!policy) {
            return res.status(404).send("Policy not found");
        }
        res.status(200).send(policy);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete a policy by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const policy = await Policy.findByIdAndDelete(id);
        if (!policy) {
            return res.status(404).send("Policy not found");
        }
        res.status(200).send("Policy deleted successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
