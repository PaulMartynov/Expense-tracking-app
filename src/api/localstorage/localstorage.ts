const STORAGE_KEY = process.env.LOCAL_STORAGE_KEY as string;

export function saveData(data: (string | null | undefined)[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadData(): string[] {
  const data = JSON.parse(<string>localStorage.getItem(STORAGE_KEY));
  return data ?? [];
}

export function deleteData(): void {
  localStorage.removeItem(STORAGE_KEY);
}
