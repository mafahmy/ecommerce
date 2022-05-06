import express from "express";
import data from "../data.js";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import {
  generateToken,
  isAuth,
  isAdmin,
  generateEmailVerificationToken,
} from "../utils.js";
import { sendEmail } from "../utils/email.js";
import { verifyEmailTemp } from "../utils/EmailTemp.js";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    //await User.deleteMany({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (bcrypt.compare(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isVerified: user.isVerified,
          token: generateToken(user),
        });

        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res
        .status(401)
        .send({ message: "User with a given email already Exist!" });
    } else {
      user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      });
    }

    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      isVerified: createdUser.isVerified,
      token: generateToken(createdUser),
    });
  })
);

userRouter.post(
  "/verification",
  expressAsyncHandler(async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).send({ message: "User Not FOUND" });
    } else {
      const verificationToken = generateEmailVerificationToken(user);
      user.emailVerificationToken = verificationToken;
      await user.save();

      const link = `http://localhost:3000/email/verify/${verificationToken}`;
      const subject = "verify email";
      const sendMail = await sendEmail(
        user.email,
        subject,
        verifyEmailTemp(link)
      );
      res.send({ message: `An email was sent to ${user.email} please verify` })
    }
  })
);
userRouter.post(
  "/email/verify/:token",
  expressAsyncHandler(async (req, res) => {
    let user = await User.findOne({ emailVerificationToken: req.params.token });

    if (!user) {
      res.status(400).send({ message: "Invalid Link" });
    }
    user.isVerified = true;
    user.emailVerificationToken = "";
    await user.save();
    

    res.send({ message: "Email Verified Successfully" });
  })
);

userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user.isAdmin) {
      res.send({ message: "Can not do that" });
    }
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  })
);

userRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === "Mahmoud@gmail.com") {
        res.status(400).send({ message: "Can Not Delete Admin" });
        return;
      }
      const deleteUser = await user.delete();
      res.send({ message: "User Deleted", user: deleteUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);
userRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.status = req.body.status || user.status;
      user.isAdmin = req.body.isAdmin || user.isAdmin;
      const updatedUser = await user.save();
      res.send({ message: "User Updated", user: updatedUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

export default userRouter;
