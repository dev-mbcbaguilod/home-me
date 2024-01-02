import express from 'express';
import { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserProfile, updatePassword, updateProfile, allUsers, getUserDetails, updateUser, deleteUser } from '../controllers/authControllers.js';
const router = express.Router(); // creates an instance of an express router
import { isAuthenticatedUser, authorizedRoles } from '../middlewares/auth.js'

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);

router
    .route('/admin/users')
    .get(isAuthenticatedUser, authorizedRoles('admin'), allUsers);

router
    .route('/admin/users/:id')
    .get(isAuthenticatedUser, authorizedRoles('admin'), getUserDetails)
    .put(isAuthenticatedUser, authorizedRoles('admin'), updateUser)
    .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteUser)

export default router;