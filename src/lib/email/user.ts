import { generateToken } from '@utils/jwt';
import { getEmailPath } from '@utils/paths';
import axios from 'axios';


export const sendEmailVerification = async (name: string, email: string, locate: string) => {
  try {
    // Form path
    const path = getEmailPath('confirm');

    // Generate token
    const token = generateToken({ email });

    // Form
    const data = {
      username: name,
      to: [email],
      locate,
      confirmationLink: `${window.location.origin}/${locate}/email-confirmation?token=${token}`
    };

    console.log(data);

    // Send email
    const response = await axios.post(path, data);

    // Return response
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};