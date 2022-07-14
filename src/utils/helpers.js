export const buildHeaders = (headers = {}) => {
  const requestHeaders = Object.assign(
    {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`
    },
    headers
  );

  return requestHeaders;
}