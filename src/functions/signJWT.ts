//  no fazt
import jwt from 'jsonwebtoken';
import config from '../config';
import IUser from '../interfaces/Users';

const signJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void ): void => {
 const timeSinchEpoch = new Date().getTime();
 const expirationTime = timeSinchEpoch + Number(config.SERVER_TOKEN_EXPIRETIME) * 100000;
const expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    try {
        jwt.sign(
            {
                username: user.username
            },
            config.SERVER_TOKEN_SECRET, 
            {
                issuer: config.SERVER_TOKEN_ISSUER,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSeconds
            },
            ( error, token ) => {
                if ( error )  {
                    callback(error, null);
                } else if ( token ) {
                    callback(null, token);
                }
            }
        )
    } catch (error) {
        // callback( error, null );
        console.log(error)
    }
}

export default signJWT