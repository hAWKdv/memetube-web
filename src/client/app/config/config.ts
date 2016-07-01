// Feel free to extend this interface
// depending on your app specific config.
export interface IConfig {
  API: string;
  AUTH_TOKEN: string;
  AUTH_USERNAME: string;
  MEME_FETCH_PORTION: number;
}

export const Config: IConfig = {
  API: 'http://192.168.0.103:8080',
  AUTH_TOKEN: 'mt-auth-token',
  AUTH_USERNAME: 'mt-username',
  MEME_FETCH_PORTION: 5,
};

//export const Config: IConfig = JSON.parse('<%= ENV_CONFIG %>');
