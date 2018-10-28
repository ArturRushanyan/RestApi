
const setCookies = (res, token) => {
  const result = res.cookie('access_token', token, {
    httpOnly: true,
  });
  return result;
};

export default setCookies;
