import jwt from 'jsonwebtoken';

type Payload = {
    id: string;
    email: string
}

export const generateAccessToken = (payload:Payload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string);
}

export const generateRefreshToken = (payload:Payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string);
}