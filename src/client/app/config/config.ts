// Feel free to extend this interface
// depending on your app specific config.
export interface IConfig {
  API: string;
  AUTH_TOKEN: string;
  AUTH_USERNAME: string;
}

export const Config: IConfig = {
  API: 'localhost:3000',
  AUTH_TOKEN: 'mt-auth-token',
  AUTH_USERNAME: 'mt-username'
};

//export const Config: IConfig = JSON.parse('<%= ENV_CONFIG %>');
