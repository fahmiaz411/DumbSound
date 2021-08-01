const { user, transact } = require("../../models");
const bcrypt = require("bcrypt");
const joi = require("joi");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { fullname, password, email } = req.body;
    const data = req.body;

    const schema = joi
      .object({
        email: joi.string().email().required(),
        password: joi.string().min(8).required(),
        fullname: joi.string().min(6).required(),
        gender: joi.string().required(),
        phone: joi.number().min(3).required(),
        address: joi.string().required(),
      })
      .validate(data);

    if (schema.error) {
      return res.send({
        status: "failed",
        message: schema.error.details[0].message,
      });
    }

    const checkEmail = await user.findOne({
      where: {
        email: email,
      },
    });

    if (checkEmail) {
      return res.send({
        status: "failed",
        message: "Email already exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const dataBody = {
      fullname: fullname,
      email: email,
    };

    console.log(data);

    await user.create({
      ...data,
      password: hashPassword,
      role: "user",
      active: "no",
    });

    res.send({
      status: "success",
      data: {
        user: dataBody,
      },
    });
  } catch (error) {
    console.log(error);

    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.send({
        status: "failed",
        message: "Email could'nt empty",
      });
    }

    let data;

    if (email) {
      data = await user.findOne({
        where: {
          email,
        },
      });
    }

    if (!data) {
      return res.send({
        status: "failed",
        message: `Email or password wrong!`,
      });
    }

    const hashPassword = await bcrypt.compare(password, data.password);

    if (!hashPassword) {
      return res.send({
        status: "failed",
        message: `Email or password wrong!`,
      });
    }

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(
      {
        id: data.id,
      },
      secretKey
    );

    const { fullname } = data;

    const date = new Date();

    await user.update(
      {
        active: "yes",
        updatedAt: date,
      },
      {
        where: {
          email: email,
        },
      }
    );

    const dataBody = await user.findOne({
      where: {
        email: email,
      },
      include: {
        model: transact,
        as: "transaction",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    res.send({
      status: "success",
      data: {
        user: dataBody,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);

    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const id = req.idUser;

    const dataUser = await user.findOne({
      where: {
        id,
      },
      include: {
        model: transact,
        as: "transaction",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return res.status(404).send({
        status: "failed",
      });
    }

    res.send({
      status: "success",
      data: {
        user: dataUser,
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};
