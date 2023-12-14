// message 타입과 user 타입 임시로 정의

export interface message{
  id: number;
  name: string;
  content: string;
  user: user;
  aid: number; //알고리즘 id
  created_at: string;
}

export interface user{
  id: number;
  name: string;
  image: string;
}