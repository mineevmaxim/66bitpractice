import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './ProfilePage.module.scss';
import { Page } from 'widgets/Page/ui/Page.tsx';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = memo((props: ProfilePageProps) => {
    const { className } = props;

    return <Page className={classNames(cls.ProfilePage, {}, [className])}>/</Page>;
});

export default ProfilePage;
