import { TripHoldEmailConfirmationProps } from '@app/models';
import { getEmailPath } from '@utils/paths';
import axios from 'axios';

export const sendEmailVerification = async (data: TripHoldEmailConfirmationProps) => {
  try {
    const path = getEmailPath('confirm');
    const response = await axios.post(path, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};