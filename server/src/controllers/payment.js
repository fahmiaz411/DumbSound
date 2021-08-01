const { user, music, artist, transact } = require("../../models");

exports.subscribe = async (req, res) => {
  try {
    const { idUser, body } = req;
    const attache = req.files.attache[0].filename;
    const startDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);

    await transact.create({
      ...body,
      userId: idUser,
      startDate,
      dueDate: startDate,
      attache,
      status: "pending",
    });

    res.send({
      status: "success",
      message: "Your transactions success please wait",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const data = await transact.findAll({
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
    });

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.actionPayment = async (req, res) => {
  try {
    const { body } = req;

    const data = await transact.update(
      {
        ...body,
      },
      {
        where: {
          id: body.id,
        },
      }
    );

    res.send({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const { idUser } = req;

    const data = await transact.destroy({
      where: {
        userId: idUser,
      },
    });

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
