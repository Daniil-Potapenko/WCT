import {body, validationResult} from 'express-validator'
import UserModel from "../models/User.js";

export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (result.errors.length) break;
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({errors: errors.array()});
    };
};


export const registrationSchema = [
    body('fullName').isLength({min: 3}),
    body('email').isEmail().custom(async (value)=>{
        const userExist = UserModel.findOne({"email":value})

        if(await userExist){
            throw new Error('Email already in use')
        }
    }),
    body('password').isLength({min: 5}),
]

export const dataEvaluateSchema = [
    body('id').isMongoId(),
    body('type').custom(async value => {
        const types = ['inc', 'dec']

        if (!types.includes(value)) {
            throw new Error('type Error')
        }
    })
]

export const authenticationSchema = [
    body('password').isLength({min: 4}),
    body('email').isEmail()
]