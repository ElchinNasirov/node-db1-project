const express = require("express");
const db = require("../data/dbConfig.js");

const router = express.Router();

// GET - getting all the data
router.get("/", async (req, res, next) => {
    try {
        const accounts = await db("accounts")
            .select("*")

        res.json(accounts);
    }
    catch (err) {
        next(err)
    }
})

// GET - getting data by ID
router.get("/:id", async (req, res, next) => {
    try {
        const account = await db("accounts")
            .select("*")
            .where("id", req.params.id)
            .limit(1)

        res.json(account);
    }
    catch (err) {
        next(err)
    }
})

// POST - adding new data
router.post("/", async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }

        const [accountID] = await db("accounts")
            .insert(payload)

        const account = await db("accounts")
            .select("*")
            .where("id", accountID)

        res.status(201).json(account);
    }
    catch (err) {
        next(err)
    }
})

// PUT - updating existing data
router.put("/:id", async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }

        await db("accounts")
            .update(payload)
            .where("id", req.params.id);

        const account = await db
            .first("*")
            .from("accounts")
            .where("id", req.params.id);

        res.json(account)

    }
    catch (err) {
        next(err);
    }
})

// DELETE - deleteing data
router.delete("/:id", async (req, res, next) => {
    try {
        await db("accounts")
            .delete()
            .where("id", req.params.id)

        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
})

module.exports = router;