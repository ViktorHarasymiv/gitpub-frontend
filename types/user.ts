// USER

export type User = {
  email?: string;
  name?: string;
  photo?: string;
  gender?: string;
  dueDate?: string;
};

// AUTH

export type RegisterRequest = {
  email: string;
  name: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

// SESSION

export type CheckSessionRequest = {
  success: boolean;
};

// RESPONSE

export type UpdateUserRequest = {
  gender?: string;
  dueDate?: string;
  photo?: string;
};

export type UserResponse = {
  user: {
    photo?: string;
    gender?: string;
    dueDate?: string;
  };
};
