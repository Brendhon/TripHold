import { SignOptions, sign, verify } from 'jsonwebtoken';

/**
 * Get secret key for jwt
 * @returns {string} Secret key
 */
const getSecretKey = (): string => process.env.JWT_SECRET ?? "secret";

/**
 * Generate jwt token
 * @param {object} data - Data to generate token
 * @param {string} expiresIn - Expiration time
 * @returns {string} Token
 */
export const generateToken = (data: object, expiresIn?: string): string => {
  // Secret key
  const secretKey = getSecretKey();

  // Options
  const options: SignOptions = {
    expiresIn: expiresIn ?? "30d"
  };

  return sign(data, secretKey, options);
}

/**
 * Verify jwt token
 * @param {string} token - Token to verify
 */
export const verifyToken = (token: string) => verify(token, getSecretKey());