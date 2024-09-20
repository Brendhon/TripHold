import { generateToken } from '@utils/jwt';
import { getEmailPath } from '@utils/paths';
import axios from 'axios';


/**
 * Send email verification
 * @param {string} id User id
 * @param {string} name User name
 * @param {string} email User email
 * @param {string} locate User location
 */
export const sendEmailVerification = async (id: string, name: string, email: string, locate: string) => {
  try {
    // Form path
    const path = getEmailPath('confirm');

    // Generate token
    const token = generateToken({ id, email, name });

    // Form
    const data = {
      username: name,
      to: [email],
      locate,
      confirmationLink: `${window.location.origin}/${locate}/email-confirmation?token=${token}`
    };

    // Send email
    const response = await axios.post(path, data);

    // Return response
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Send forgot password email
 * @param {string} email User email
 * @param {string} locate User location
 * @returns {Promise<any>}
 */
export const sendForgotPasswordEmail = async (email: string, locate: string) => {
  try {
    // Form path
    const path = getEmailPath('reset');

    // Generate token
    const token = generateToken({ email });

    // Form
    const data = {
      to: [email],
      locate,
      resetLink: `${window.location.origin}/${locate}/reset-password?token=${token}`
    };

    // Send email
    const response = await axios.post(path, data);

    // Return response
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};