const { user, music, artist, transact } = require("../../models");
const joi = require("joi");

exports.addMusic = async (req, res) => {
  try {
    const { body } = req;

    const thumbnail = req.files.thumbnail[0].filename;
    const attache = req.files.attache[0].filename;

    const data = await music.create({
      ...body,
      thumbnail,
      attache,
    });

    const artists = await artist.findOne({
      where: {
        id: data.dataValues.artistId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    console.log(data);

    res.send({
      status: "success",
      data: {
        ...data.dataValues,
        artist: artists,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.addArtist = async (req, res) => {
  try {
    const { body } = req;

    const find = await artist.findOne({
      where: {
        name: body.name,
      },
    });

    if (find) {
      return res.send({
        status: "failed",
        Message: "Artist already",
      });
    }

    const data = await artist.create({
      ...body,
    });

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getArtists = async (req, res) => {
  try {
    const data = await artist.findAll();

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getMusics = async (req, res) => {
  try {
    const data = await music.findAll({
      include: {
        model: artist,
        as: "artist",
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
