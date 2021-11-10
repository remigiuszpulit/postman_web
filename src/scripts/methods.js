export const getData = async (url) => {
  const data = await fetch(url).then((response) => response.json());
  return data;
};

export const postData = async (url, body) => {
  console.log(body);
  const data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      mode: "no-cors",
      "Access-Control-Allow-Origin": "*",
    },
    body: body,
  }).then((response) => response.json());
  return data;
};
