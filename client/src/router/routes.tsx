import {Outlet, RouteObject} from "react-router-dom";
import Layout from "@views/layout/layout.tsx";
import CategoriesView from "@/views/categories-view/categories-view.tsx";
import CategoryForm from "@components/category-form/category-form.tsx";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout/>,
        children: [
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
                ]
            },

        ]
    }
];