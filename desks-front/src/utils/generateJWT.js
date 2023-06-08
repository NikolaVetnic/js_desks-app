import CryptoJS from "crypto-js";

const generateJWT = (payload) => {
    const header = { alg: "HS256", typ: "JWT" };
    const encodedHeader = b64url(
        CryptoJS.enc.Utf8.parse(JSON.stringify(header))
    );

    const encodedPayload = b64url(
        CryptoJS.enc.Utf8.parse(JSON.stringify(payload))
    );

    const expiration =
        Math.floor(Date.now() / 1000) +
        parseInt(process.env.REACT_APP_JWT_EXPIRES_IN, 10);
    const encodedExpiration = b64url(
        CryptoJS.enc.Utf8.parse(JSON.stringify(expiration))
    );

    const signature = CryptoJS.HmacSHA256(
        encodedHeader + "." + encodedPayload + "." + encodedExpiration,
        process.env.REACT_APP_JWT_SECRET
    );
    const encodedSignature = b64url(signature);

    return `Bearer ${encodedHeader}.${encodedPayload}.${encodedExpiration}.${encodedSignature}`;
};

const b64url = (data) => {
    const base64 = CryptoJS.enc.Base64.stringify(data);
    const b64url = base64
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    return b64url;
};

export default generateJWT;
