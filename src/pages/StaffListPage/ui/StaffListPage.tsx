import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import cls from './StaffListPage.module.scss';
import { Page } from 'widgets/Page';
import { HStack } from 'shared/ui/Stack/HStack/HStack.tsx';
import { Text } from 'shared/ui/Text/Text.tsx';
import { VStack } from 'shared/ui/Stack/VStack/VStack.tsx';
import { Input } from 'shared/ui/Input/Input.tsx';
import { Button } from 'shared/ui/Button/Button.tsx';
import { EmployeeDto } from 'entities/Employee';
import axios from 'axios';
import { StaffList } from 'features/StaffList';

interface StaffListPageProps {
    className?: string;
}

const StaffListPage = memo((props: StaffListPageProps) => {
    const { className } = props;
    const [items, setItems] = useState<EmployeeDto[]>([]);
    const [page, setPage] = useState<number>(1);
    const getItems = useCallback((page: number) => {
        axios
            .get<
                EmployeeDto[]
            >(`https://frontend-test-api.stk8s.66bit.ru/api/Employee?page=${page}&count=5`)
            .then((res) => {
                if (!res.data) return null;
                setItems((prev) => [...prev, ...res.data]);
                setPage((prev) => prev + 1);
            });
    }, []);

    return (
        <Page
            center={false}
            grid={false}
            className={classNames(cls.StaffListPage, {}, [className])}
            onScrollEnd={() => getItems(page)}
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
