export namespace NavigationAppRoutes {
  export namespace Open {
    export enum Auth {
      SIGN_IN_START = "/sign-in",
    }
  }
  export namespace Private {
    export namespace Admin {
      export const INDEX = "/private/admin";
      export enum Surveys {
        INDEX = "/private/admin/surveys",
        CREATE = "/private/admin/surveys/create",
      }
    }

    export enum Surveys {
      INDEX = "/private/surveys",
    }
    // export enum Profile {
    //   PROFILE_SETTINGS = "/private/profile/settings",
    // }
    // export enum Settings {
    //   USERS = "/private/settings/users",
    // }
  }
}
