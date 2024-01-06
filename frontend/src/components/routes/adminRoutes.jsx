import React from 'react';
import {Route} from 'react-router-dom';
import ProtectedRoute from "../auth/ProtectedRoute";
import Dashboard from '../admin/Dashboard';
import ListProducts from '../admin/ListProducts';
import NewProduct from '../admin/NewProduct';
import UpdateProduct from '../admin/UpdateProduct';
import UploadImages from '../admin/UploadImages';
import ListOrders from '../admin/ListOrders';
import ProcessOrder from '../admin/ProcessOrder';
import ListUsers from '../admin/ListUsers';
import UpdateUser from '../admin/UpdateUser';
import ProductReviews from '../admin/ProductReviews';


const adminRoutes = () => {
  return (
    <>
        <Route path="/admin/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
        } />

        <Route path="/admin/products" element={
                <ProtectedRoute>
                    <ListProducts />
                </ProtectedRoute>
        } />

        <Route path="/admin/product/new" element={
                <ProtectedRoute>
                    <NewProduct />
                </ProtectedRoute>
        } />

        <Route path="/admin/products/:id" element={
                <ProtectedRoute>
                    <UpdateProduct />
                </ProtectedRoute>
        } />

        <Route path="/admin/products/:id/upload_images" element={
                <ProtectedRoute>
                    <UploadImages />
                </ProtectedRoute>
        } />

        <Route path="/admin/orders" element={
                <ProtectedRoute>
                    <ListOrders />
                </ProtectedRoute>
        } />

        <Route path="/admin/orders/:id" element={
                <ProtectedRoute>
                    <ProcessOrder />
                </ProtectedRoute>
        } />

        <Route path="/admin/users" element={
                <ProtectedRoute>
                    <ListUsers />
                </ProtectedRoute>
        } />

        <Route path="/admin/users/:id" element={
                <ProtectedRoute>
                    <UpdateUser />
                </ProtectedRoute>
        } />

        <Route path="/admin/reviews" element={
                <ProtectedRoute>
                    <ProductReviews />
                </ProtectedRoute>
        } />
    </>
  )
}

export default adminRoutes