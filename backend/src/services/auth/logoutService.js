const logoutService = async (req) => {
  if (req.session) {
    await new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  // Optional: clear auth cookie if any
  if (req.cookies) {
    req.clearCookie("connect.sid"); // adjust if cookie name differs
  }

  return true;
};

export default logoutService;
