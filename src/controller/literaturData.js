const { User, Category, Book, Literature } = require("./../../models");

const joi = require("@hapi/joi");

exports.getLiterature = async(req, res) => {
    try {
        const literature = await Literature.findAll({
            where: {
                status: "Approved"
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
            },
            order: [
                ["id", "DESC"]
            ]
        });

        res.send({
            message: "Data Succsesfully Loaded",
            data: {
                literature
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

exports.getAdmLiterature = async(req, res) => {
    try {
        // console.log("Ini adalah ID user yang login ", req.user);

        const literature = await Literature.findAll({
            include: {
                model: User,
                as: "user_id",
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            },
            attributes: {
                exclude: [
                    "createdAt",
                    "updatedAt",
                    "categoryId",
                    "userId",
                    "CategoryId",
                    "UserId"
                ]
            },
            order: [
                ["id", "DESC"]
            ]
        });

        res.send({
            message: "Data Succsesfully Loaded",
            data: {
                literature
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

exports.getDetailLiterature = async(req, res) => {
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

exports.addLiterature = async(req, res) => {
    try {
        // const createBook = await Book.create(req.body);
        // res.send({
        //     message: "Data succsesfully created",
        //     data: {
        //         Book: createBook
        //     }
        // });

        const {
            title,
            userId,
            publication_date,
            pages,
            ISBN,
            author,
            status,
            attache
        } = req.body;

        const schema = joi.object({
            title: joi
                .string()
                .min(3)
                .required(),
            userId: joi.string(),
            publication_date: joi
                .string()
                .min(5)
                .required(),
            pages: joi
                .number()
                .min(1)
                .required(),
            ISBN: joi
                .number()
                .min(8)
                .required(),
            author: joi
                .string()
                .min(3)
                .required(),
            status: joi
                .string()
                .min(5)
                .required(),
            attache: joi
                .string()
                .min(5)
                .required()
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send({
                error: {
                    message: error.details[0].message
                }
            });
        }

        const createLiterature = await Literature.create({
            title,
            userId,
            publication_date,
            pages,
            ISBN,
            author,
            status,
            attache,
            thumbnail: "https://drive.google.com/uc?id=1pyX-I4fAEkmFRDfWiII94C0dJmILg-4m"
        });
        res.send({
            message: "Data succsesfully created",
            data: {
                Literature: createLiterature
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

exports.editBook = async(req, res) => {
    try {
        const { id } = req.params;
        const edit = await Book.update(req.body, {
            where: {
                id
            }
        });

        res.send({
            message: "Data has been updated",
            data: {
                Book: req.body
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server Error"
        });
    }
};

exports.deleteBook = async(req, res) => {
    try {
        const { id } = req.params;
        const dataDeleted = await Book.findOne({
            where: {
                id
            },
            attributes: {
                exclude: [
                    "title",
                    "publication",
                    "categoryId",
                    "userId",
                    "pages",
                    "ISBN",
                    "aboutBook",
                    "file",
                    "thumbnail",
                    "status",
                    "createdAt",
                    "updatedAt"
                ]
            }
        });
        await Book.destroy({
            where: {
                id
            }
        });

        res.send({
            message: `Data with id ${id} has been deleted`,
            data: {
                Book: dataDeleted
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Server ERROR"
        });
    }
};