const { User, Library, Literature } = require("./../../models");

exports.getLibrary = async(req, res) => {
    try {
        const { id } = req.params;
        const library = await Library.findAll({
            include: [{
                    model: Literature,
                    as: "literature",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "userId", "UserId"]
                    }
                },
                {
                    model: User,
                    as: "user",
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt"]
                    }
                }
            ],
            attributes: {
                exclude: ["BookId", "UserId", "createdAt", "updatedAt"]
            }
        });

        res.send({
            message: "Data Succsesfully Loaded",
            data: {
                library
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

exports.detailLibrary = async(req, res) => {
    try {
        const { literatureId, userId } = req.params;
        const detail = await Library.findOne({
            where: {
                literatureId,
                userId
            },
            attributes: {
                exclude: ["id", "LiteratureId", "UserId", "createdAt", "updatedAt"]
            }
        });

        res.send({
            message: `Bookmark with user id ${userId} and literature id ${literatureId} has found`,
            data: {
                library: detail

            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

exports.addLibrary = async(req, res) => {
    try {
        const { literatureId, userId } = req.body;
        const addBookmarks = await Library.create({
            literatureId,
            userId
        });

        res.send({
            message: "Data Succsesfully Created",
            data: {
                library: {
                    literatureId,
                    userId
                }
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

exports.removeLibrary = async(req, res) => {
    try {
        const { literatureId, userId } = req.params;
        await Library.destroy({
            where: {
                literatureId,
                userId
            }
        });
        res.send({
            message: `Bookmark removed`,
            data: {
                library: `Library with user id ${userId} & literature id ${literatureId} removed`
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server ERROR"
        });
    }
};