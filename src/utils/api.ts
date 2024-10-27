import { useSearchParams } from "react-router-dom";
import { NavigationAppRoutes } from "../constants/navigation-routes";
import { useNavigateParams } from "../hooks/useNavigateParams";
// import { stringify } from "qs";
import { components } from "./backend-api-types";

const apiUrl = import.meta.env.VITE_BACKEND_URL as string;

class Api {
  private readonly mainUrl: string;
  private readonly defaultHeaders: Headers;

  constructor(url: string) {
    this.mainUrl = url;
    this.defaultHeaders = new Headers();
    this.defaultHeaders.set("Content-type", "application/json");
    const token = localStorage.getItem("accessToken");
    if (token) this.defaultHeaders.set("Authorization", `Bearer ${token}`);
  }

  async fetcher(url: string, init: RequestInit) {
    const result = await fetch(url, init);
    if (!result.ok) {
      if (result.status === 401) {
        const navigate = useNavigateParams();
        const [searchParams] = useSearchParams();
        navigate(NavigationAppRoutes.Open.Auth.SIGN_IN_START, searchParams);
        // await this.renewToken();
        // const retryResult = await fetch(url, init);
        // if (!retryResult.ok && retryResult.status === 401) {
        //   const error = await result.json();
        //   throw { status: result.status, error };
        // } else {
        //   return retryResult;
        // }
      }

      const error = await result.json();
      throw { status: result.status, error };
    }
    return result;
  }

  async login(data: {
    username: string;
    password: string;
  }): Promise<{ accessToken: string }> {
    const url = new URL(this.mainUrl + "users/login");
    const result = await this.fetcher(url.toString(), {
      method: "POST",
      body: JSON.stringify(data),
      headers: this.defaultHeaders,
    });
    const creds = await result.json();
    localStorage.setItem("accessToken", creds.accessToken);
    this.updateHeadersWithToken(creds.accessToken);
    return { accessToken: creds.accessToken };
  }

  // async renewToken() {
  //   const session = await Auth.currentSession();
  //   const accessToken = session.getIdToken();
  //   const jwt = accessToken.getJwtToken();
  //   this.updateHeadersWithToken(jwt);
  // }

  updateHeadersWithToken(token: string | null | undefined) {
    if (token) this.defaultHeaders.set("Authorization", `Bearer ${token}`);
    else this.defaultHeaders.delete("Authorization");
  }

  async getCurrentUser(): Promise<components["schemas"]["UserSchema"]> {
    const url = new URL(this.mainUrl + "users/current");
    const result = await this.fetcher(url.toString(), {
      method: "GET",
      headers: this.defaultHeaders,
    });
    const data = await result.json();
    return data;
  }

  // async getUsers(): Promise<components["schemas"]["UserPlusSchema"][]> {
  //   const url = new URL(this.mainUrl + "users/all");
  //   const result = await this.fetcher(url.toString(), {
  //     method: "GET",
  //     headers: this.defaultHeaders,
  //   });
  //   const data = await result.json();
  //   return data;
  // }

  // async getUser(
  //   id: string | number
  // ): Promise<components["schemas"]["UserPlusSchema"] | undefined> {
  //   const url = new URL(this.mainUrl + `users/${id}`);
  //   const result = await this.fetcher(url.toString(), {
  //     method: "GET",
  //     headers: this.defaultHeaders,
  //   });
  //   const data = await result.json();
  //   return data;
  // }

  async createUser(payload: components["schemas"]["UserSignUpSchema"]) {
    const url = new URL(this.mainUrl + `users/`);
    await this.fetcher(url.toString(), {
      method: "POST",
      headers: this.defaultHeaders,
      body: JSON.stringify(payload),
    });
  }

  // async updateUser(
  //   id: string | number,
  //   payload: components["schemas"]["UserModSchema"]
  // ) {
  //   const url = new URL(this.mainUrl + `users/${id}`);
  //   await this.fetcher(url.toString(), {
  //     method: "PUT",
  //     headers: this.defaultHeaders,
  //     body: JSON.stringify(payload),
  //   });
  // }

  // async deleteUser(id: string | number) {
  //   const url = new URL(`${this.mainUrl}users/${id}/`);
  //   await this.fetcher(url.toString(), {
  //     method: "DELETE",
  //     headers: this.defaultHeaders,
  //   });
  // }

  // async postToConsole(args: Array<string>) {
  //   const url = new URL(this.mainUrl + "console");

  //   const payload: components["schemas"]["CmdSchema"] = {
  //     cmd: args[0],
  //     args: args.splice(1),
  //   };

  //   const result = await this.fetcher(url.toString(), {
  //     method: "POST",
  //     headers: this.defaultHeaders,
  //     body: JSON.stringify(payload),
  //   });

  //   return await result.json();
  // }

  // async getAccessPoints(
  //   page: number,
  //   limit: number,
  //   filter?: Record<string, any>
  // ): Promise<components["schemas"]["GetAPsSchema"]> {
  //   try {
  //     const queryString = stringify({
  //       limit,
  //       page,
  //       ...filter,
  //     });

  //     const url = new URL(this.mainUrl + `access-points/?${queryString}`);
  //     const result = await this.fetcher(url.toString(), {
  //       method: "GET",
  //       headers: this.defaultHeaders,
  //     });

  //     const data = await result.json();

  //     return data;
  //   } catch (e: any) {
  //     console.warn(e);
  //     throw e;
  //   }
  // }

  // async getAccessPoint(
  //   id: string | number
  // ): Promise<components["schemas"]["APSchema"] | undefined> {
  //   try {
  //     const url = new URL(`${this.mainUrl}access-points/${id}/`);
  //     const result = await this.fetcher(url.toString(), {
  //       method: "get",
  //       headers: this.defaultHeaders,
  //     });
  //     const data = await result.json();
  //     return data;
  //   } catch (e: any) {
  //     console.warn(e);
  //     throw e;
  //   }
  // }

  // async getNetwork(
  //   id: string | number
  // ): Promise<components["schemas"]["NetworkGigaSchema-Output"] | undefined> {
  //   try {
  //     const url = new URL(`${this.mainUrl}networks/${id}/`);
  //     const result = await this.fetcher(url.toString(), {
  //       method: "get",
  //       headers: this.defaultHeaders,
  //     });
  //     const data = await result.json();
  //     return data;
  //   } catch (e: any) {
  //     console.warn(e);
  //     throw e;
  //   }
  // }

  // async updateAccessPoint(
  //   id: string,
  //   accessPoint: Partial<components["schemas"]["PutAPSchema"]>
  // ) {
  //   try {
  //     console.log("BEFORE AP UPDATE", accessPoint);
  //     const url = new URL(`${this.mainUrl}access-points/${id}/`);
  //     const result = await this.fetcher(url.toString(), {
  //       method: "PUT",
  //       body: JSON.stringify(accessPoint),
  //       headers: this.defaultHeaders,
  //     });

  //     // return await result.json();
  //   } catch (e: any) {
  //     console.warn(e);
  //     throw e;
  //   }
  // }

  // async updateNetwork(
  //   id: string,
  //   network: Partial<components["schemas"]["PutNetworkSchema"]>
  // ) {
  //   try {
  //     console.log("BEFORE NETWORK UPDATE", network);
  //     const url = new URL(`${this.mainUrl}networks/${id}/`);
  //     const result = await this.fetcher(url.toString(), {
  //       method: "PUT",
  //       body: JSON.stringify(network),
  //       headers: this.defaultHeaders,
  //     });

  //     // return await result.json();
  //   } catch (e: any) {
  //     console.warn(e);
  //     throw e;
  //   }
  // }

  // async updateWireless(
  //   id: string,
  //   data: Partial<components["schemas"]["PutWirelessSchema"]>
  // ) {
  //   try {
  //     console.log("BEFORE WIRELESS UPDATE", data);
  //     const url = new URL(`${this.mainUrl}wireless/${id}/`);
  //     const result = await this.fetcher(url.toString(), {
  //       method: "PUT",
  //       body: JSON.stringify(data),
  //       headers: this.defaultHeaders,
  //     });

  //     // const res = await result.json();
  //     // console.log("AFTER WIRELESS UPDATE", res);
  //     // return res;
  //   } catch (e: any) {
  //     console.warn(e);
  //     throw e;
  //   }
  // }

  // async updateSecurity(
  //   id: string,
  //   data: Partial<components["schemas"]["PutSecuritySchema"]>
  // ) {
  //   try {
  //     const url = new URL(`${this.mainUrl}security/${id}/`);
  //     const result = await this.fetcher(url.toString(), {
  //       method: "PUT",
  //       body: JSON.stringify(data),
  //       headers: this.defaultHeaders,
  //     });

  //     // return await result.json();
  //   } catch (e: any) {
  //     console.warn(e);
  //     throw e;
  //   }
  // }

  // async updateMacAcl(
  //   id: string,
  //   data: Partial<components["schemas"]["PutMacAclSchema"]>
  // ) {
  //   try {
  //     const url = new URL(`${this.mainUrl}mac-acls/${id}/`);
  //     const result = await this.fetcher(url.toString(), {
  //       method: "PUT",
  //       body: JSON.stringify(data),
  //       headers: this.defaultHeaders,
  //     });

  //     // return await result.json();
  //   } catch (e: any) {
  //     console.warn(e);
  //     throw e;
  //   }
  // }
}

export default new Api(apiUrl);
