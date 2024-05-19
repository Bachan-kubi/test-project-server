import Joi from "joi";

const userNameValidationSchema = Joi.object({
    firstName: Joi.string()
      .trim()
      .min(3)
      .max(20)
      .required()
      .custom((value, helpers) => {
        const nameStr = value.charAt(0).toUpperCase() + value.slice(1);
        if (nameStr !== value) {
          return helpers.error('any.invalid', { value });
        }
        return value;
      }, 'Capitalization validation')
      .messages({
        'any.invalid': '{#label} is not capitalize format!',
      }),
    middleName: Joi.string()
      .trim()
      .required()
      .messages({
        'string.empty': 'Middle name is must need!',
      }),
    lastName: Joi.string()
      .trim()
      .required()
      .pattern(/^[A-Za-z]+$/, 'alpha')
      .messages({
        'string.pattern.name': '{#label} is not a valid last name!',
      }),
  });
  
  const guardianValidationSchema = Joi.object({
    fathersName: Joi.string().required(),
    fathersOccupation: Joi.string().required(),
    fathersContactNo: Joi.string().required(),
    mothersName: Joi.string().required(),
    mothersOccupation: Joi.string().required(),
    mothersContactNo: Joi.string().required(),
  });
  
  const localGuardianValidationSchema = Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contactNo: Joi.string().required(),
    address: Joi.string().required(),
  });
  
  const studentValidationSchema = Joi.object({
    id: Joi.string().required(),
    name: userNameValidationSchema.required(),
    gender: Joi.string().valid('Male', 'Female', 'Other').required()
      .messages({
        'any.only': '{#label} is not supported!',
      }),
    DOB: Joi.string().optional(),
    isMarried: Joi.boolean().optional(),
    email: Joi.string().email().required(),
    contactNo: Joi.string().required(),
    emergencyContactNo: Joi.string().optional(),
    permanentAddress: Joi.string().required(),
    presentAddress: Joi.string().required(),
    bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').optional(),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImg: Joi.string().required(),
    isActive: Joi.string().valid('active', 'blocked').default('active'),
  });

  export default studentValidationSchema;