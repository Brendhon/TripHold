/**
 * Get user path
 * @param {string} email User email
 * @returns User path
 */
export const getUsersPath = (email?: string) => {
  return `/users/${email || ""}`;
}