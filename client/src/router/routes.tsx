import {RouteObject} from "react-router-dom";
import Layout from "@/views/layout.tsx";
import CategoriesView from "@/views/categories-view/categories-view.tsx";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: 'categories-view',
                element: <CategoriesView/>
            }
        ]
    }
];