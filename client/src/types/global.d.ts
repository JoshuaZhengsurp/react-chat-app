export {};
declare global {
  interface User {
    id: number;
    username: string;
    role: number;
    avatar: string;
    email: string;
    [propsName: string]: unknown;
  }

  interface SettingItem {
    role: number;
    id: number;
    name: string;
    handle?: (...arg?: unknown[]) => unknown;
  }
}
