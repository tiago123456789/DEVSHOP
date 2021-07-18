import axios from "./../utils/HttpClient";
import { parseCookies } from "nookies";
import Cookies from "js-cookie"
import environment from "../utils/Environment";

export interface AuthCredential {

  email: String
  password: String

}

export interface AuthToken {

  accessToken: String
  refreshToken: String

}


export default class AuthService {

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      Cookies.remove("accessToken", {
        expires: 1, path: "/"
      });
      Cookies.remove("refreshToken", {
        expires: 1, path: "/"
      });
    }
  }

  async refreshAccessAndRefreshToken() {
    const { refreshToken } = this.getAuthToken();
    const query = `
      query {
        refreshAccessAndRefreshToken(input: "${refreshToken}") {
          accessToken, refreshToken
        }
      }
    `;

    const response = await axios.post(
      process.env.NEXT_PUBLIC_URL_BASE,
      { query: query }
    );

    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    console.log(response)
    if (response.data.errors) {
      return null;
    }

    const authCredential: AuthToken = response.data?.data.refreshAccessAndRefreshToken;
    return this.store(authCredential);
  }

 

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
    localStorage.setItem("accessToken", authToken.accessToken)
    // @ts-ignore
    localStorage.setItem("refreshToken", authToken.refreshToken)

    Cookies.set('accessToken', authToken.accessToken, { path: '/' });
    Cookies.set('refreshToken', authToken.refreshToken, { path: '/' });
  }

  getAuthToken(contextNext?: { [key: string]: any }): AuthToken {
    if (environment.isFrontend()) {
      const accessToken = localStorage.getItem("accessToken")
      const refreshToken = localStorage.getItem("refreshToken")
      return {
        accessToken,
        refreshToken
      }
    }

    // @ts-ignore
    return parseCookies(contextNext);
  }

  private isAuthenticatedBackend(contextNext) {
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

  private isAuthenticatedFrontend() {
    const { accessToken } = this.getAuthToken(null);
    if (!accessToken) {
      return false;
    }

    let payload = accessToken.split(".")[1]
    payload = JSON.parse(atob(payload))
    const exp = payload["exp"];
    if (Date.now() >= exp * 1000) {
      return false;
    }

    return true;
  }

  isAuthenticated(contextNext) {
    if (environment.isFrontend()) {
      return this.isAuthenticatedFrontend()
    }

    return this.isAuthenticatedBackend(contextNext);
  }
}