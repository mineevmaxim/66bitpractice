import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import cls from './StaffListPage.module.scss';
import { Page } from 'widgets/Page';
import { HStack } from 'shared/ui/Stack/HStack/HStack.tsx';
import { Text } from 'shared/ui/Text/Text.tsx';
import { VStack } from 'shared/ui/Stack/VStack/VStack.tsx';
import { Input } from 'shared/ui/Input/Input.tsx';
import { Button } from 'shared/ui/Button/Button.tsx';
import { EmployeeDto, Gender, Position, Stack } from 'entities/Employee';
import axios from 'axios';
import { StaffList } from 'features/StaffList';
import { Select, SelectItem } from 'shared/ui/Select/Select.tsx';

interface StaffListPageProps {
    className?: string;
}

type GetEmployeesProps = {
    page?: number;
    count?: number;
    name?: string;
    gender?: Gender;
    position?: Position;
    stack?: Stack;
};

const StaffListPage = memo((props: StaffListPageProps) => {
    const { className } = props;
    const [items, setItems] = useState<EmployeeDto[]>([]);
    const [page, setPage] = useState<number>(1);
    const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
    const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
    const [selectedStack, setSelectedStack] = useState<Stack | null>(null);
    const getItems = useCallback((getItemsProps: GetEmployeesProps) => {
        const { page = 1, gender, name = '', stack, position, count = 5 } = getItemsProps;
        axios
            .get<EmployeeDto[]>(`https://frontend-test-api.stk8s.66bit.ru/api/Employee`, {
                params: {
                    page,
                    gender,
                    name,
                    stack,
                    position,
                    count,
                },
            })
            .then((res) => {
                if (!res.data) return null;
                setItems((prev) => [...prev, ...res.data]);
                setPage((prev) => prev + 1);
            });
    }, []);

    const onChangePosition = useCallback(({ value }: SelectItem<Position>) => {
        setSelectedPosition((prev) => {
            if (prev === value) return null;
            return value;
        });
    }, []);

    const onChangeStack = useCallback(({ value }: SelectItem<Stack>) => {
        setSelectedStack((prev) => {
            if (prev === value) return null;
            return value;
        });
    }, []);

    const onChangeGender = useCallback(({ value }: SelectItem<Gender>) => {
        setSelectedGender((prev) => {
            if (prev === value) return null;
            return value;
        });
    }, []);

    return (
        <Page
            center={false}
            grid={false}
            className={classNames(cls.StaffListPage, {}, [className])}
            onScrollEnd={() =>
                getItems({
                    page,
                    position: selectedPosition ?? undefined,
                    gender: selectedGender ?? undefined,
                    stack: selectedStack ?? undefined,
                })
            }
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
                        <Select<Position>
                            items={[
                                { title: 'Frontend-Разработчик', value: 'Frontend' },
                                { title: 'Аналитик', value: 'Analyst' },
                                { title: 'Backend-Разработчик', value: 'Backend' },
                                { title: 'Менеджер', value: 'Manager' },
                                { title: 'Дизайнер', value: 'Designer' },
                            ]}
                            selected={
                                selectedPosition
                                    ? {
                                          value: selectedPosition,
                                          title: selectedPosition,
                                      }
                                    : null
                            }
                            placeholder={<Text text={'Должность'} />}
                            onChange={onChangePosition}
                        />
                        <Select<Gender>
                            items={[
                                {
                                    title: 'Мужчина',
                                    value: 'Male' as Gender,
                                },
                                {
                                    title: 'Женщина',
                                    value: 'Female' as Gender,
                                },
                            ]}
                            selected={
                                selectedGender
                                    ? {
                                          title: selectedGender,
                                          value: selectedGender,
                                      }
                                    : null
                            }
                            placeholder={<Text text={'Пол'} />}
                            onChange={onChangeGender}
                        />

                        <Select<Stack>
                            items={[
                                { title: 'PHP', value: 'PHP' },
                                { title: 'C#', value: 'CSharp' },
                                { title: 'Java', value: 'Java' },
                                { title: 'Word', value: 'Word' },
                                { title: 'React', value: 'React' },
                                { title: 'Figma', value: 'Figma' },
                            ]}
                            selected={
                                selectedStack
                                    ? {
                                          value: selectedStack,
                                          title: selectedStack,
                                      }
                                    : null
                            }
                            placeholder={<Text text={'Стэк технологий'} />}
                            onChange={onChangeStack}
                        />
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
