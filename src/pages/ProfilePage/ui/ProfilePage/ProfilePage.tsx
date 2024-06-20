import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect, useState } from 'react';
import cls from './ProfilePage.module.scss';
import { Page } from 'widgets/Page';
import { HStack } from 'shared/ui/Stack/HStack/HStack.tsx';
import { EmployeeDto } from 'entities/Employee';
import { VStack } from 'shared/ui/Stack/VStack/VStack.tsx';
import { Text } from 'shared/ui/Text/Text.tsx';
import { Tab } from 'shared/ui/Tab/Tab.tsx';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
    });

    if (!id || !profile) return null;

    return (
        <Page
            grid
            crumb={profile?.name}
            center={false}
            className={classNames(cls.ProfilePage, {}, [className])}
        >
            <HStack
                max
                gap={'32'}
                align={'start'}
                className={cls.info}
            >
                <div className={cls.imageContainer}>
                    <img
                        src={profile.photo}
                        alt="avatar"
                        className={cls.image}
                    />
                </div>
                <VStack gap={'16'}>
                    <Text
                        text={profile.name}
                        size={'display_lg'}
                        weight={'bold'}
                    />
                    <Text
                        text={profile.position}
                        size={'xl'}
                        weight={'medium'}
                    />
                    <HStack gap={'16'}>
                        {profile.stack.map((item) => (
                            <Tab
                                key={item}
                                text={item}
                            />
                        ))}
                    </HStack>
                </VStack>
            </HStack>
            <VStack
                gap={'32'}
                className={cls.description}
            >
                <Text
                    size={'display_sm'}
                    weight={'semibold'}
                    text={'Основная информация'}
                />
                <div className={cls.descriptionGrid}>
                    <Text
                        size={'display_xs'}
                        weight={'medium'}
                        text={'Контактный телефон:'}
                        className={cls.left}
                    />
                    <Text
                        size={'display_xs'}
                        text={profile.phone.replace('(', '').replace(')', '')}
                        className={cls.right}
                    />
                    <Text
                        size={'display_xs'}
                        weight={'medium'}
                        text={'Дата рождения:'}
                        className={cls.left}
                    />
                    <Text
                        size={'display_xs'}
                        text={profile.birthdate}
                        className={cls.right}
                    />
                    <Text
                        size={'display_xs'}
                        weight={'medium'}
                        text={'Дата устройства:'}
                        className={cls.left}
                    />
                    <Text
                        size={'display_xs'}
                        text={profile.dateOfEmployment}
                        className={cls.right}
                    />
                </div>
            </VStack>
        </Page>
    );
});

export default ProfilePage;
