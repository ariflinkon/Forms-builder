const FormModel = require('../db/Form');
const UserModel = require('../db/User');
const ResponseModel = require('../db/Response');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT tokens
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send('Token is required for authentication');
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid token');
    }
    return next();
};

module.exports = {
    // Get all forms (no authentication required)
    formsGet: async (req, res) => {
        try {
            const result = await FormModel.find().lean();
            res.send(result);
        } catch (e) {
            res.status(500).send(e);
        }
    },

    // Create a form (authentication required)
    createForm: [verifyToken, async (req, res) => {
        try {
            const { name, description } = req.body;
            const createdBy = req.user.id;

            const newForm = new FormModel({
                createdBy,
                name,
                description,
            });

            await newForm.save().then((docs) => {
                UserModel.updateOne(
                    { _id: createdBy },
                    { $push: { createdForms: docs._id } }
                )
                .then(() => {
                    console.log('Form ID added to user details');
                })
                .catch(error => console.log('Error updating user: ', error));

                res.status(200).json(docs);
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }],

    // Get a form by ID
    getFormById: async (req, res) => {
        try {
            const formId = req.params.formId;

            const form = await FormModel.findOne({ _id: formId });
            if (!form) {
                return res.status(404).send('Form not found');
            }
            res.status(200).json(form);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // Delete a form (authentication required, only by owner)
    deleteForm: [verifyToken, async (req, res) => {
        try {
            const { formId } = req.params;
            const userId = req.user.id;

            const form = await FormModel.findOne({ _id: formId });
            if (!form) {
                return res.status(404).send('Form not found or already deleted');
            }

            if (form.createdBy.toString() === userId) {
                await form.remove();
                return res.status(202).send('Form Deleted');
            } else {
                return res.status(401).send('You are not the owner of this form');
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }],

    // Edit a form (authentication required, only by owner)
    editForm: [verifyToken, async (req, res) => {
        try {
            const { formId, name, description, questions } = req.body;
            const userId = req.user.id;

            const form = await FormModel.findOne({ _id: formId });
            if (!form || form.createdBy.toString() !== userId) {
                return res.status(401).send('Unauthorized to edit this form');
            }

            const updatedForm = await FormModel.findByIdAndUpdate(
                formId,
                { name, description, questions },
                { new: true }
            );
            res.status(200).json(updatedForm);
        } catch (error) {
            res.status(500).send(error);
        }
    }],

    // Get all forms created by a user (authentication required)
    getAllFormsOfUser: [verifyToken, async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await UserModel.findOne({ _id: userId });

            if (!user) {
                return res.status(404).send('User not found');
            }

            const forms = await FormModel.find().where('_id').in(user.createdForms).exec();
            res.status(200).json(forms);
        } catch (error) {
            res.status(500).send(error);
        }
    }],

    // Submit a response to a form
    submitResponse: [verifyToken, async (req, res) => {
        try {
            const { formId, response } = req.body;
            const userId = req.user.id;

            if (!response || response.length === 0) {
                return res.status(400).send('Fill at least one field');
            }

            const newResponse = new ResponseModel({ formId, userId, response });
            const savedResponse = await newResponse.save();
            res.status(200).json(savedResponse);
        } catch (error) {
            res.status(500).send(error);
        }
    }],

    // Get all responses for a form
    getResponse: async (req, res) => {
        try {
            const { formId } = req.params;

            const responses = await ResponseModel.find({ formId });
            res.status(200).json(responses);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // Get all responses (no authentication required)
    allResponses: async (req, res) => {
        try {
            const result = await ResponseModel.find().lean();
            res.json(result);
        } catch (e) {
            res.status(500).send(e);
        }
    }
};
