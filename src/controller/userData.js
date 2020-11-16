const { Literature, User, Library } = require("./../../models");
const { Op } = require("sequelize");

exports.getUsers = async(req, res) => {
    try {
        const users = await User.findAll({
            include: [{
                    model: Literature,
                    as: "literature"
                },
                {
                    model: Library,
                    as: "library",
                    include: [{
                        model: Literature,
                        as: "literature",
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "userId", "UserId"]
                        }
                    }]
                }
            ],
            attributes: {
                exclude: ["password", "createdAt", "updatedAt"]
            }
        });

        res.send({
            message: "User Succsesfully Loaded",
            data: { users }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error",
            data: err
        });
    }
};

exports.getDetail = async(req, res) => {
    try {
        const { id } = req.params;
        const detail = await User.findOne({
            where: {
                id
            },
            include: [{
                    model: Literature,
                    as: "literature",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                },
                {
                    model: Library,
                    as: "library",
                    include: [{
                        model: Literature,
                        as: "literature",
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "userId", "UserId"]
                        }
                    }]
                }
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            order: [
                ["id", "DESC"]
            ]
        });

        res.send({
            message: `User ${id} found`,
            data: {
                User: detail
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

exports.getDetailAuthor = async(req, res) => {
    try {
        const { id } = req.params;
        const detail = await Literature.findOne({
            where: {
                id
            },
            include: {
                model: User,
                as: "user_id",
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        });

        res.send({
            message: `Literature ${id} found`,
            data: {
                data: detail
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

exports.uploadProfile = async(req, res) => {
    try {
        const id = req.params.id;
        await User.update({ avatar: req.file.filename }, {
            where: {
                id
            }
        });
        const user = await User.findOne({
            where: {
                id
            },

            attributes: {
                exclude: [
                    "password",
                    "phone",
                    "address",
                    "gender",
                    "createdAt",
                    "updatedAt"
                ]
            }
        });
        res.send({
            message: "Profile Picture has changed",
            data: {
                user
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: {
                message: "Internal Server Error"
            }
        });
    }
};