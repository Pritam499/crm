import logoutService from "../../services/auth/logoutService.js";
import generateResponse from "../../utils/generateResponse.js";

const logoutController = async (req, res) => {
  try {
    await logoutService(req);
    res
      .status(200)
      .json(generateResponse(true, {}, "Logged out successfully."));
  } catch (error) {
    console.error("Logout error:", error);
    res
      .status(500)
      .json(generateResponse(false, {}, "Logout failed", error.message));
  }
};

export default logoutController;
