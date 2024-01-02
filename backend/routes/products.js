import express from 'express';
import {getProducts, newProduct, getProductDetails, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteReview} from '../controllers/productControllers.js'; // imports the functions that handles the logic for handling product-related routes/requests
import { authorizedRoles, isAuthenticatedUser } from '../middlewares/auth.js';
const router = express.Router(); // creates an instance of an express router

router.route('/products').get(getProducts);
router
    .route('/admin/products')
    .post(isAuthenticatedUser, authorizedRoles("admin"), newProduct);

router.route('/products/:id').get(getProductDetails);

router
    .route('/admin/products/:id')
    .put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
router
    .route('/admin/products/:id')
    .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct);

router
    .route('/reviews')
    .get(isAuthenticatedUser, getProductReviews)
    .put(isAuthenticatedUser, createProductReview);

router
    .route('/admin/reviews')
    .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteReview)

export default router;