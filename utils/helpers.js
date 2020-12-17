export const getHost = (ctx) => {
  if (ctx.req) return ctx.req.headers.host;
  return location.host
};

export const fetcher = async (url, options = {}) => {
  const res = await fetch(url, options);
  if (res.status === 200 || res.status === 201) return ({ error: null, data: await res.json()});
  else return ({ error: await res.json(),  data: null });
};
