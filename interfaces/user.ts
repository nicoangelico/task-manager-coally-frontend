export interface ILoginUserBody {
  email: string;
  password: string;
}

export interface ICreateUserBody {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}