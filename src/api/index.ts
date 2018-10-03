const requestHeaders = () => ({
  'Content-Type': 'application/json',
});

const fetchIt = async (url, options) => {
  const optionsWithHeaders = {
    ...options,
    credentials: 'omit',
    mode: 'cors',
    headers: requestHeaders(),
  };
  const request = new Request(url, optionsWithHeaders);

  try {
    const response = await fetch(request);
    if (response.status >= 400) throw new Error(response.status);
    return await response.json();
  } catch (error) {
    return Promise.reject(error);
  }
};

export default fetchIt;
