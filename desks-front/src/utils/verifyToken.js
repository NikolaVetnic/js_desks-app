import Cookies from "js-cookie";

const verifyToken = () => {
    const token = Cookies.get("token");

    if (token) {
        try {
            const tokenParts = token.split("."); // split token into 3 parts

            const encodedPayload = tokenParts[1]; // get payload part
            const payload = JSON.parse(atob(encodedPayload)); // decode and parse payload - not used at this point

            const expirationPart = tokenParts[2];
            const decodedExpiration = atob(expirationPart);
            const expiration = parseInt(decodedExpiration, 10);

            // check token expiration
            const currentTime = Math.floor(Date.now() / 1000);

            return expiration > currentTime
                ? {
                      username: payload.username,
                      isAuthenticated: true,
                      role: payload.role,
                  }
                : {
                      username: undefined,
                      isAuthenticated: false,
                      role: undefined,
                  };
        } catch (error) {
            return false; // token verification failed
        }
    }

    // no token found
    return false;
};

export default verifyToken;
