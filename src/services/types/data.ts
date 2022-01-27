export type TIngredients = {
  type?: string;
    _id: string;
    image: string;
    name: string;
    price: number;
}

export type TIngredient = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
}

export type TForgotPassword = {
  message: string;
  success: boolean;
}

export type TAuth = {
  accessToken: string;
    refreshToken: string;
    success: boolean;
    user: {
      email: string;
      name: string;
    }
}

export type TUserData = {
    success: boolean;
    user: {
      email: string;
      name: string
    }
}

export type TUpdateToken = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export type TOrder = {
  number: number;
}
