import isEmail from "validator/lib/isEmail";

const isValidEmail = email => {
  if (!email || typeof email !== "string") {
    return false;
  }

  return isEmail(email);
};

export default isValidEmail;
