export interface IAuthData {
    nickname: string;
    password: string;
}

export interface IContext {
    signIn: Function,
    signOut: Function
}

export interface AuthResponse {
    status: number;
    message: string;
    user: {
        id: string;
        jwt: string;
        nickname: string;
    }
}

export interface IUserStore {
    id: string;
    nickname: string;
}

export interface NewMessage {
    target: string;
    message: string;
  }