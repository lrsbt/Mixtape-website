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

export type StatusEntry = {
  id: number;
  file: string;
  startAt: number;
  duration: number;
}

export type MixStatus =
  | { ok: true; state: "ready", entries: StatusEntry[], entriesHash: string, times: number[]; }
  | { ok: false; state: "mixing" | "empty" };