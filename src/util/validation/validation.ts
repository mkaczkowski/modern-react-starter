export const required = () => (value: string) => (!value ? 'Required' : undefined);

export const email = () => (value: string) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email' : undefined;

// eslint-disable-next-line no-restricted-globals
export const number = () => (value: string) => (value && isNaN(Number(value)) ? 'Is not a number' : undefined);
