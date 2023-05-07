const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_USER_SECRET } = require("../config/env_variables");
const {
  successResponse,
  failureResponse,
  statusCodes,
  serverFailure
} = require("../utils/api-response");

exports.createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!name || !password) {
      return failureResponse(res, statusCodes.BAD_REQUEST, "Invalid Payload");
    }

    // check if user exists
    const userExists = await db("users").select().where("email", email);
    if (userExists[0]) {
      return failureResponse(res, statusCodes.BAD_REQUEST, "A user with this email already exist.");
    }

    const hash = bcrypt.hashSync(password, 8);

    // create user
    await db("users").insert({
      email,
      name,
      password: hash,
      created_at: new Date()
    });

    return successResponse(res, statusCodes.SUCCESS, `user created succesfully`, {});
  } catch (error) {
    console.log({ error });
    return serverFailure(res);
  }
};

exports.getProfile = async (req, res) => {
  try {
    // get id from header token
    const { id } = req.userData;

    // check if user exists
    const user = await db("users").select(["id", "email", "name", "created_at"]).where("id", id);
    if (!user[0]) {
      return failureResponse(res, statusCodes.BAD_REQUEST, "A user with this id does not exist.");
    }

    return successResponse(res, statusCodes.SUCCESS, `profile fetched succesfully`, { ...user[0] });
  } catch (error) {
    console.log({ error });
    return serverFailure(res);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await db("users").select(["id", "email", "name", "created_at"]);

    return successResponse(res, statusCodes.SUCCESS, `user Fetched succesfully`, { users });
  } catch (error) {
    console.log({ error });
    return serverFailure(res);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await db("users").select().where("email", email);
    if (!user[0]) {
      return failureResponse(res, statusCodes.UNAUTHORIZED, "Incorrect email or password");
    }

    // compare the passwords using bcrypt
    const passwordIsValid = bcrypt.compareSync(password, user[0].password);

    if (!passwordIsValid) {
      return failureResponse(res, statusCodes.UNAUTHORIZED, "Incorrect email or password");
    }

    const generatedToken = jwt.sign({ email: user[0].email, id: user[0].id }, JWT_USER_SECRET, {
      expiresIn: "2d"
    });

    return successResponse(res, statusCodes.SUCCESS, "login success", {
      id: user[0].id,
      email: user[0].email,
      name: user[0].name,
      token: generatedToken
    });
  } catch (error) {
    console.log({ error });
    return serverFailure(res);
  }
};
