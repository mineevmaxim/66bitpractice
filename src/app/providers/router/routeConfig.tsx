import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { ProfilePage } from 'pages/ProfilePage';
import { StaffListPage } from 'pages/StaffListPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
};

export enum AppRoutes {
    MAIN = 'main',
    STAFF_LIST = 'staff',
    STAFF_DETAILS = 'staff_details',
    // NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.STAFF_DETAILS]: '/staff/',
    [AppRoutes.STAFF_LIST]: '/staff',
    // [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.STAFF_LIST]: {
        path: RoutePath['staff'],
        element: <StaffListPage />,
    },
    [AppRoutes.STAFF_DETAILS]: {
        path: RoutePath['staff_details'] + ':id',
        element: <ProfilePage />,
    },
};
