import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './StaffListPage.module.scss';
import { Page } from 'widgets/Page/ui/Page.tsx';
import { HStack } from 'shared/ui/Stack/HStack/HStack.tsx';
import { Text } from 'shared/ui/Text/Text.tsx';
import { VStack } from 'shared/ui/Stack/VStack/VStack.tsx';
import { Input } from 'shared/ui/Input/Input.tsx';
import { Button } from 'shared/ui/Button/Button.tsx';
import { StaffList } from 'features/StaffList/ui/StaffList/StaffList.tsx';
import { Employee } from 'entities/Employee/model/types/employee.ts';

interface StaffListPageProps {
    className?: string;
}

const items: Employee[] = [
    {
        id: 100,
        name: 'Давыдов Ярослав Андреевич',
        photo: 'http://frontend-test-api.stk8s.66bit.ru/photos/male/7.jpg',
        phone: '+7 (987) 473-16-30',
        gender: 'male',
        position: 'Frontend',
        stack: ['Word'],
        birthdate: '02 октября 1994',
        dateOfEmployment: '03 марта 2016',
    },
    {
        id: 99,
        name: 'Попова Алина Евгеньевна',
        photo: 'http://frontend-test-api.stk8s.66bit.ru/photos/female/27.jpg',
        phone: '+7 (962) 964-74-32',
        gender: 'female',
        position: 'Designer',
        stack: ['Figma'],
        birthdate: '23 апреля 1990',
        dateOfEmployment: '25 января 2018',
    },
    {
        id: 98,
        name: 'Веселова София Андреевна',
        photo: 'http://frontend-test-api.stk8s.66bit.ru/photos/female/13.jpg',
        phone: '+7 (927) 754-95-16',
        gender: 'female',
        position: 'Frontend',
        stack: ['React'],
        birthdate: '19 июня 1990',
        dateOfEmployment: '19 октября 2019',
    },
    {
        id: 97,
        name: 'Филатов Антон Данилович',
        photo: 'http://frontend-test-api.stk8s.66bit.ru/photos/male/21.jpg',
        phone: '+7 (931) 510-13-35',
        gender: 'male',
        position: 'Backend',
        stack: ['Java', 'CSharp'],
        birthdate: '20 декабря 1993',
        dateOfEmployment: '05 июля 2022',
    },
    {
        id: 96,
        name: 'Красильникова Вера Викторовна',
        photo: 'http://frontend-test-api.stk8s.66bit.ru/photos/female/8.jpg',
        phone: '+7 (939) 124-49-96',
        gender: 'female',
        position: 'Designer',
        stack: ['Figma'],
        birthdate: '13 июля 1993',
        dateOfEmployment: '09 декабря 2017',
    },
    {
        id: 95,
        name: 'Богданова Римма Артёмовна',
        photo: 'http://frontend-test-api.stk8s.66bit.ru/photos/female/22.jpg',
        phone: '+7 (934) 335-05-65',
        gender: 'female',
        position: 'Manager',
        stack: ['Word'],
        birthdate: '07 февраля 1990',
        dateOfEmployment: '27 сентября 2016',
    },
    {
        id: 94,
        name: 'Лыткин Эдуард Алексеевич',
        photo: 'http://frontend-test-api.stk8s.66bit.ru/photos/male/43.jpg',
        phone: '+7 (986) 053-52-71',
        gender: 'male',
        position: 'Analyst',
        stack: ['Word'],
        birthdate: '11 марта 1989',
        dateOfEmployment: '19 марта 2017',
    },
    {
        id: 93,
        name: 'Никонов Олег Артёмович',
        photo: 'http://frontend-test-api.stk8s.66bit.ru/photos/male/9.jpg',
        phone: '+7 (985) 808-55-05',
        gender: 'male',
        position: 'Manager',
        stack: ['Word'],
        birthdate: '30 июня 1989',
        dateOfEmployment: '04 августа 2018',
    },
    {
        id: 92,
        name: 'Александрова Евгения Викторовна',
        photo: 'http://frontend-test-api.stk8s.66bit.ru/photos/female/15.jpg',
        phone: '+7 (980) 908-33-97',
        gender: 'female',
        position: 'Analyst',
        stack: ['Word'],
        birthdate: '29 марта 1997',
        dateOfEmployment: '13 января 2019',
    },
    {
        id: 91,
        name: 'Суворова Нина Дмитриевна',
        photo: 'http://frontend-test-api.stk8s.66bit.ru/photos/female/2.jpg',
        phone: '+7 (976) 977-10-16',
        gender: 'female',
        position: 'Frontend',
        stack: ['React'],
        birthdate: '19 июня 1997',
        dateOfEmployment: '29 января 2018',
    },
];

const StaffListPage = memo((props: StaffListPageProps) => {
    const { className } = props;

    return (
        <Page
            center={false}
            grid={false}
            className={classNames(cls.StaffListPage, {}, [className])}
        >
            <VStack
                className={cls.container}
                gap={'16'}
            >
                <HStack
                    max
                    justify={'between'}
                    align={'center'}
                >
                    <Text
                        variant={'primary'}
                        size={'display_lg'}
                        weight={'bold'}
                        text={'Список сотрудников'}
                    />
                    <HStack gap={'16'}>
                        <Text text={'Должность'} />
                        <Text text={'Пол'} />
                        <Text text={'Стэк технологий'} />
                    </HStack>
                </HStack>
                <Input placeholder={'Поиск'} />
            </VStack>
            <HStack
                max
                className={cls.filters}
                justify={'center'}
            >
                <HStack
                    className={cls.container}
                    justify={'between'}
                    align={'center'}
                >
                    <HStack>
                        <Text text={'Выбранные фильтры'} />
                    </HStack>
                    <Button>
                        <Text
                            variant={'inverted'}
                            text={'Найти'}
                        />
                    </Button>
                </HStack>
            </HStack>
            <VStack className={cls.container}>
                <StaffList employees={items} />
            </VStack>
        </Page>
    );
});

export default StaffListPage;
