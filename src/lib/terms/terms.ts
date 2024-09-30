import axios from "axios";

/**
 * Get service terms
 * @param {string} locale - Locale
 */
export const getServiceTerms = async (locale: string): Promise<{title: string, desc: string}> => {
  // Get airports in public folder
  const response = await axios.get('../../service-terms.json');

  // Check if response is valid
  if (!response.data) throw { message: 'Invalid response' };

  // Get airports
  return response.data[locale ?? 'pt'];
}