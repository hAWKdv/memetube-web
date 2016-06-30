export const Storage = {
  set: (key: string, payload: any) => localStorage.setItem(key, payload),
  get: (key: string) => localStorage.getItem(key),
  remove: (key: string) => localStorage.removeItem(key),
  clear: () => localStorage.clear()
};
