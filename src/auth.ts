import jwt from 'jsonwebtoken'

import { auth } from './configs/config';
import { createRefreshToken } from './database';

export function generateJwtAndRefreshToken(email: string, payload: object = {}) {
  const token = jwt.sign(payload, auth.secret, {
    subject: email,
    expiresIn: 60*60, // 15 minutes 
  });

  const refreshToken = createRefreshToken(email)

  return {
    token,
    refreshToken,
  }
}
