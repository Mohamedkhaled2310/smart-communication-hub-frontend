import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
    }),
});

export const registerSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
      "string.empty": "Full name is required",
      "string.min": "Name must be at least 3 characters long",
    }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.empty": "Email is required",
        "string.email": "Please enter a valid email address",
      }),
      password: Joi.string()
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$"))
      .required()
      .messages({
        "string.empty": "Password is required",
        "string.pattern.base":
          "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character",
      }),
  });
  