import { v4 as uuidv4 } from "uuid";

export function safePromise<T>(promise: Promise<T>): Promise<T | null>;
export function safePromise<T>(
  promise: Promise<T>,
  defaultValue: T
): Promise<T>;
export async function safePromise<T>(
  promise: Promise<T>,
  defaultValue?: T
): Promise<T | null> {
  try {
    const value = await promise;
    return value;
  } catch (error) {
    console.error(error);
    return defaultValue ?? null;
  }
}

export function getUuid(): string {
  return uuidv4();
}
