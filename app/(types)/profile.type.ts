export interface Profile {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  role: string;
  sessions: Session[];
  createdAt: string;
  avatar: string;
}

export interface Session {
  id: string;
  expiresAt: string;
  userAgent: string;
}
