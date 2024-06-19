import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './ProfilePage.module.scss';
import { Page } from 'widgets/Page/ui/Page.tsx';
import { HStack } from 'shared/ui/Stack/HStack/HStack.tsx';
import { Employee } from 'entities/Employee/model/types/employee.ts';
import { VStack } from 'shared/ui/Stack/VStack/VStack.tsx';
import { Text } from 'shared/ui/Text/Text.tsx';
import { Tab } from 'shared/ui/Tab/Tab.tsx';

interface ProfilePageProps {
    className?: string;
}

const profile: Employee = {
    id: 96,
    name: 'Красильникова Вера Викторовна',
    photo: 'http://frontend-test-api.stk8s.66bit.ru/photos/female/8.jpg',
    phone: '+7 (939) 124-49-96',
    gender: 'female',
    position: 'Designer',
    stack: ['Figma', 'CSharp', 'PHP'],
    birthdate: '13 июля 1993',
    dateOfEmployment: '09 декабря 2017',
};

const ProfilePage = memo((props: ProfilePageProps) => {
    const { className } = props;

    return (
        <Page
            grid
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
                            <Tab text={item} />
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
                        text={profile.phone}
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
