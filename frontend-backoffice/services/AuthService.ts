import axios from "axios";
import { parseCookies, setCookie } from "nookies";

export interface AuthCredential {

  email: String
  password: String

}

export interface AuthToken {

  accessToken: String
  refreshToken: String

}


export default class AuthService {


  async authenticate(authCredential: AuthCredential) {
    const query = `
        query {
          authenticate(input: { 
            email: "${authCredential.email}",
            password: "${authCredential.password}" }){
            accessToken, refreshToken
          }
        }
      `;
    const response = await axios.post(
      process.env.NEXT_PUBLIC_URL_BASE,
      { query: query }
    );

    if (response.data.errors) {
      return null;
    }
    return response.data?.data.authenticate;
  }

  store(authToken: AuthToken) {
    // @ts-ignore
    setCookie(null, 'accessToken', authToken.accessToken, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })

    // @ts-ignore
    setCookie(null, 'refreshToken', authToken.refreshToken, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
  }

  getAuthToken(contextNext: { [key: string]: any }): AuthToken {
    // @ts-ignore
    return parseCookies(contextNext);
  }

  isAuthenticated(contextNext) {
    const { accessToken } = this.getAuthToken(contextNext);
    if (!accessToken) {
      return false;
    }

    let payload = accessToken.split(".")[1]
    payload = JSON.parse(Buffer.from(payload, "base64").toString("utf-8"))
    const exp = payload["exp"];
    if (Date.now() >= exp * 1000) {
      return false;
    }

    return true;
  }

}
