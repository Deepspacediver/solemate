import {Outlet, RouteObject} from "react-router-dom";
import Layout from "@views/layout/layout.tsx";
import CategoriesView from "@/views/categories-view/categories-view.tsx";
import CategoryForm from "@components/category-form/category-form.tsx";
import ShoesView from "@views/shoes-view/shoes-view.tsx";
import ShoeForm from "@components/shoe-form/shoe-form.tsx";
import CategoryView from "@views/category-view/category-view.tsx";
import ShoeDetails from "@components/shoe-details/shoe-details.tsx";
import HomeView from "@views/home-view/home-view.tsx";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '',
                element: <HomeView/>
            },
            {
                path: 'categories',
                element: <Outlet/>,
                children: [
                    {
                        path: '',
                        element: <CategoriesView/>
                    },
                    {
                        path: 'add-category',
                        element: <CategoryForm/>
                    },
                    {
                        path: ':categoryId',
                        element: <CategoryView/>
                    },
                    {
                        path: ':categoryId/edit-category',
                        element: <CategoryForm/>
                    },

                ]
            },
            {
                path: 'shoes',
                element: <Outlet/>,
                children: [
                    {
                        path: '',
                        element: <ShoesView/>
                    },
                    {
                        path: 'add-shoe',
                        element: <ShoeForm/>
                    }, {
                        path: ':shoeId',
                        element: <ShoeDetails/>
                    }, {
                        path: ':shoeId/edit-shoe',
                        element: <ShoeForm/>
                    },
                ]
            }

        ]
    }
];