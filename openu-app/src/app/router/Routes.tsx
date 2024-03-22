import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import ProfilePage from "../../features/profiles/ProfilePage";
import RequireAuth from "./RequireAuth";
import VacationDashbord from "../../features/vacations/dashbord/VacationDashbord";
import VacationDetails from "../../features/vacations/details/VacationDetails";
export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                element: <RequireAuth />, children: [
                    { path: 'activities/:id', element: <ActivityDetails /> },
                    { path: 'vacations', element: <VacationDashbord /> },
                    { path: 'vacations/:id', element: <VacationDetails/> },
                    { path: 'createActivity', element: <ActivityForm key='creat' /> },
                    { path: 'manage/:id', element: <ActivityForm key='manage' /> },
                    { path: 'profiles/:userName', element: <ProfilePage key='manage' /> },
                    { path: 'errors', element: <TestErrors /> },
                ]
            },
            { path: 'not-found', element: <NotFound /> },
            { path: '*', element: <Navigate replace to='/not-found' /> },
            { path: 'server-error', element: <ServerError /> },
        ]
    },
]
export const router = createBrowserRouter(routes);