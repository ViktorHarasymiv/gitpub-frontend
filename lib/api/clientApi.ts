import { patchTask, Task } from "@/app/types/task";
import { NewTask } from "../../app/types/task";

import { serverApi } from "./api";

import {
  RegisterRequest,
  User,
  CheckSessionRequest,
  LoginRequest,
  UserResponse,
} from "../../app/types/user";

interface TasksHttpResponse {
  tasks: Task[];
  totalPages: number;
}

// export const fetchNotes = async (
//   query: string,
//   page: number,
//   tag?: string
// ): Promise<NotesHttpResponse> => {
//   const PARAMS = new URLSearchParams({
//     ...(query !== "" ? { search: query } : {}),

//     ...(tag !== undefined ? { tag } : null),
//     page: page.toString(),
//   });

//   const response = await serverApi.get<NotesHttpResponse>("/notes", {
//     params: PARAMS,
//   });

//   return response.data;
// };

// GET

export const getAllTasks = async (page: number): Promise<TasksHttpResponse> => {
  const PARAMS = new URLSearchParams({
    page: page.toString(),
  });

  const response = await serverApi.get<TasksHttpResponse>("/task", {
    params: PARAMS,
  });

  return response.data;
};

// POST

export const createTask = async (newTask: NewTask): Promise<Task> => {
  const response = await serverApi.post("/task", newTask);
  return response.data;
};

// PATCH

export const patchActiveTask = async (id: string, payload: patchTask) => {
  const res = await serverApi.patch<TasksHttpResponse>(`/task/${id}`, payload);
  return res.data;
};

// FETCH NOTE BY ID

// export const fetchNoteById = async (id: string): Promise<Note> => {
//   const response = await serverApi.get<Note>(`/notes/${id}`);
//   return response.data;
// };

// DELETE POST

// export const deleteNote = async (id: string): Promise<Note> => {
//   const response = await serverApi.delete<Note>(`/notes/${id}`);
//   return response.data;
// };

// REGISTER

export const register = async (data: RegisterRequest) => {
  const res = await serverApi.post<User>("/auth/register", data);
  return res.data;
};

// LOGIN

export const login = async (data: LoginRequest) => {
  const res = await serverApi.post<User>("/auth/login", data);
  return res.data;
};

// PATCH

export const editProfile = async (data: FormData) => {
  const res = await serverApi.patch<UserResponse>("/users/me", data);
  return res.data;
};

// CHECK SESSION

export const checkSession = async () => {
  const res = await serverApi.get<CheckSessionRequest>("/auth/session", {
    withCredentials: true,
  });

  console.log("Session response:", res.data);

  return res.data.success;
};

// AUTH ME

export const getMe = async (): Promise<User> => {
  const { data } = await serverApi.get<User>("/users/me");
  return data;
};

// LOGOUT

export const logout = async (): Promise<void> => {
  await serverApi.post("/auth/logout");
};
