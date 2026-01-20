export interface Me {
  ok: boolean;
  user?: {
    id: number;
    email: string;
  };
  token: string | null;
  code?: string;
  message?: string;
}

export interface ListItem {
  id: number;
  name: string;
}

export type Lists = ListItem[];
