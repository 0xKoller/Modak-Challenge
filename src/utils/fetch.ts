const BASE_URL = 'https://api.artic.edu/api/v1';

export default async (urlParams?: string) => {
  try {
    const response = await window.fetch(
      `${BASE_URL}${typeof urlParams !== 'undefined' && urlParams.length > 0 ? urlParams : ''}`
    );
    const data = await response.json();
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
};
