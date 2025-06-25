const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', authController.signup);              // Admin signup
router.post('/login', authController.login);                // Admin login
router.post('/guest-signup', authController.guestSignup);   // Guest signup
//router.delete('/guest/:id', authController.deleteGuest);    // Delete guest on sign out
router.post('/validate', authController.validateToken);     // Token validation
router.delete('/admin/:id', /*authMiddleware.verifyToken,*/ authController.deleteAdmin);
router.delete(
  '/guest/:id',
  //authMiddleware.verifyToken,
  //authMiddleware.requireGuest,
  authController.deleteGuest
);
router.get(
  '/admin-data',
  //authMiddleware.verifyToken,
  //authMiddleware.requireAdmin,
  authController.getAdminData
);
router.get('/all-admins', authController.getAllAdmins);
module.exports = router;