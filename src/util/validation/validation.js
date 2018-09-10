export const required = () => value => (!value ? 'Required' : undefined);

// eslint-disable-next-line no-restricted-globals
export const number = () => value => (value && isNaN(Number(value)) ? 'Is not a number' : undefined);
