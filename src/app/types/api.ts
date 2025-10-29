import { Insight } from "./insight";
import { Message } from "./message";
import { User } from "./user";

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user: Pick<User, "id" | "email">;
}

// export interface MessageListResponse extends Array<Message> {}

// export interface InsightResponse extends Insight {}
