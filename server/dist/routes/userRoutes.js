"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.findAll();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching users",
            error,
        });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findByPk(req.params.id);
        user
            ? res.json(user)
            : res.status(404).json({ message: "User not found" });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
}));
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, telephone, is_admin } = req.body;
    try {
        const user = yield User_1.User.create({
            email,
            password,
            name,
            telephone,
            is_admin,
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ message: "Error creating user", error });
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, telephone, is_admin } = req.body;
    try {
        const user = yield User_1.User.findByPk(req.params.id);
        if (user) {
            yield user.update({
                email,
                password,
                name,
                telephone,
                is_admin,
            });
            res.json(user);
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.status(400).json({ message: "Error updating user", error });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findByPk(req.params.id);
        if (user) {
            yield user.destroy();
            res.status(204).json({ message: "User deleted" });
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
}));
exports.default = router;
//# sourceMappingURL=userRoutes.js.map