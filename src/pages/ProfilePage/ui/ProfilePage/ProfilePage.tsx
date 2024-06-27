import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect, useState } from 'react';
import cls from './ProfilePage.module.scss';
import { Page } from 'widgets/Page';
import { EmployeeDto } from 'entities/Employee';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card } from 'shared/ui/Card/Card.tsx';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = memo((props: ProfilePageProps) => {
    const { className } = props;
    const [profile, setProfile] = useState<EmployeeDto | null>(null);

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            axios
                .get<EmployeeDto>('https://frontend-test-api.stk8s.66bit.ru/api/Employee/' + id)
                .then((res) => {
                    if (!res.data) return null;
                    setProfile(res.data);
                });
        }
    }, [id]);

    if (!id || !profile) return null;

    return (
        <Page
            grid
            crumb={profile?.name}
            center={false}
            className={classNames(cls.ProfilePage, {}, [className])}
        >
            <div className={cls.info}>
                <div className={cls.imageContainer}>
                    <img
                        src={profile.photo}
                        alt="avatar"
                        className={cls.image}
                    />
                </div>
                <div className={cls.profileInfo}>
                    <p className={cls.name}>{profile.name}</p>
                    <p className={cls.position}>{profile.position}</p>
                </div>
                <div className={cls.stack}>
                    {profile.stack.map((item) => (
                        <Card
                            key={item}
                            text={item}
                        />
                    ))}
                </div>
            </div>
            <div className={cls.description}>
                <p className={cls.subTitle}>Основная информация</p>
                <div className={cls.descriptionGrid}>
                    <p className={cls.left}>Контактный телефон:</p>
                    <p className={cls.left}>Дата рождения:</p>
                    <p className={cls.left}>Дата устройства:</p>
                    <p className={cls.right}>{profile.phone.replace('(', '').replace(')', '')}</p>
                    <p className={cls.right}>{profile.birthdate}</p>
                    <p className={cls.right}>{profile.dateOfEmployment}</p>
                </div>
            </div>
        </Page>
    );
});

export default ProfilePage;
