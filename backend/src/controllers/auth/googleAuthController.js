import googleAuthService from '../../services/auth/googleAuthService.js';
import generateResponse from '../../utils/generateResponse.js';

const googleAuthController = async (req, res) => {
  try {
    const result = await googleAuthService(req.body.token);
    res.status(200).json(generateResponse(true, result, 'Google authentication successful.'));
  } catch (error) {
    res.status(400).json(generateResponse(false, {}, 'Google authentication failed', error.message));
  }
};

export default googleAuthController;