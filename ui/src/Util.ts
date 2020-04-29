const apiURL = 'http://localhost:3001/graphql';

export const fetch = async (query: any) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify(query),
  };

  try {
    const response = await window.fetch(apiURL, options);
    const json = await response.json();
    return json.data;
  } catch (e) {
    console.log(e);
    return false;
  }
};
