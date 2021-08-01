const { user } = require("../../models");

const joi = require("joi");

exports.updateUser = async (req, res) => {
  try {
    const { idUser, body } = req;
    const p_image = req.files.image ? req.files.image[0].filename : null;

    const schema = joi
      .object({
        email: joi.string().email().required(),
        fullname: joi.string().min(6).required(),
        gender: joi.string().required(),
        phone: joi.string().min(3).required(),
        address: joi.string().required(),
      })
      .validate(body);

    if (schema.error) {
      return res.send({
        status: "failed",
        Message: schema.error.details[0].message,
      });
    }

    if (!p_image) {
      const update = user.update(body, {
        where: {
          id: idUser,
        },
      });

      res.send({
        status: "success",
        data: update,
      });
      return;
    }

    const update = user.update(
      {
        ...body,
        p_image,
      },
      {
        where: {
          id: idUser,
        },
      }
    );

    res.send({
      status: "success",
      data: update,
    });
  } catch (error) {
    console.log(error);
  }
};
