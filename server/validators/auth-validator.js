const { z } = require(`zod`);
const loginSchema=z.object({
  email: z
  .string({ required_error: `email is required` })
  .trim()
  .email({ message: `invalid email ` })
  .min(3, { message: `email must be at 3 char` }),
  password: z
  .string({ required_error: `Password is required` })
  .trim()
  .min(5, { message: `Password must be at 5 char` }),
})
// signup page validation

const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: `Name is required` })
    .trim()
    .min(3, { message: `Name must be at 3 char` }),
  phone: z
    .string({ required_error: `Phone is required` })
    .trim()
    .min(11, { message: `Number must be at atlest 11 char` }),
});

module.exports={signupSchema,loginSchema}