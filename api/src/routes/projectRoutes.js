const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authController = require('../controllers/authController');
/*const { authenticate, requireAdmin } = require('../middleware/authMiddleware');*/


router.get('/:userId',/* authenticate,*/projectController.getProject);
router.post('/:userId',/*authenticate,requireAdmin,*/ projectController.createProject);
router.put('/:userId/:id',/*authenticate,requireAdmin,*/ projectController.updateProject);
router.delete('/:userId/:id',/*authenticate,requireAdmin,*/ projectController.deleteProject);

module.exports = router;