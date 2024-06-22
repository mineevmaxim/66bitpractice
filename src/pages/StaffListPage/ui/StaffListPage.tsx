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
    genders?: Gender[];
    positions?: Position[];
    stacks?: Stack[];
};

const positionItems: SelectItem<Position>[] = [
    { title: 'Frontend-Разработчик', value: 'Frontend' },
    { title: 'Аналитик', value: 'Analyst' },
    { title: 'Backend-Разработчик', value: 'Backend' },
    { title: 'Менеджер', value: 'Manager' },
    { title: 'Дизайнер', value: 'Designer' },
];

const stackItems: SelectItem<Stack>[] = [
    { title: 'PHP', value: 'PHP' },
    { title: 'C#', value: 'CSharp' },
    { title: 'Java', value: 'Java' },
    { title: 'Word', value: 'Word' },
    { title: 'React', value: 'React' },
    { title: 'Figma', value: 'Figma' },
];

const genderItems: SelectItem<Gender>[] = [
    {
        title: 'Мужчина',
        value: 'Male' as Gender,
    },
    {
        title: 'Женщина',
        value: 'Female' as Gender,
    },
];

const StaffListPage = memo((props: StaffListPageProps) => {
    const { className } = props;
    const [items, setItems] = useState<EmployeeDto[]>([]);
    const [page, setPage] = useState<number>(1);
    const [selectedPositions, setSelectedPositions] = useState<Position[]>([]);
    const [selectedGenders, setSelectedGenders] = useState<Gender[]>([]);
    const [selectedStacks, setSelectedStacks] = useState<Stack[]>([]);
    const [isEmpty, setIsEmpty] = useState<boolean>(false);

    const getItems = useCallback(
        (getItemsProps: GetEmployeesProps) => {
            const { page = 1, genders, name = '', stacks, positions, count = 5 } = getItemsProps;
            if (page !== 1 && isEmpty) return null;
            const params: string[] = [];
            const url = 'https://frontend-test-api.stk8s.66bit.ru/api/Employee?';

            params.push(`Page=${page}`);
            name && params.push(`Name=${name}`);
            params.push(`Count=${count}`);

            genders?.forEach((value) => {
                params.push(`Gender=${value}`);
            });

            positions?.forEach((value) => {
                params.push(`Position=${value}`);
            });

            stacks?.forEach((value) => {
                params.push(`Stack=${value}`);
            });

            axios.get<EmployeeDto[]>(url + params.join('&')).then((res) => {
                if (!res.data || res.data.length === 0) {
                    setIsEmpty(true);
                } else {
                    setIsEmpty(false);
                }
                if (page === 1) {
                    setItems([...res.data]);
                }
                if (page > 1) {
                    setItems((prev) => [...prev, ...res.data]);
                }
                setPage((prev) => prev + 1);
            });
        },
        [isEmpty],
    );

    const onChangePosition = useCallback(({ value }: SelectItem<Position>) => {
        setSelectedPositions((prev) => {
            if (prev.includes(value)) {
                return [...prev].filter((item) => item !== value);
            }
            return [...prev, value];
        });
    }, []);

    const onChangeStack = useCallback(({ value }: SelectItem<Stack>) => {
        setSelectedStacks((prev) => {
            if (prev.includes(value)) {
                return [...prev].filter((item) => item !== value);
            }
            return [...prev, value];
        });
    }, []);

    const onChangeGender = useCallback(({ value }: SelectItem<Gender>) => {
        setSelectedGenders((prev) => {
            if (prev.includes(value)) {
                return [...prev].filter((item) => item !== value);
            }
            return [...prev, value];
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
                    positions: selectedPositions,
                    genders: selectedGenders,
                    stacks: selectedStacks,
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
                            items={positionItems}
                            selected={selectedPositions}
                            placeholder={<Text text={'Должность'} />}
                            onChange={onChangePosition}
                        />
                        <Select<Gender>
                            items={genderItems}
                            selected={selectedGenders}
                            placeholder={<Text text={'Пол'} />}
                            onChange={onChangeGender}
                        />

                        <Select<Stack>
                            items={stackItems}
                            selected={selectedStacks}
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
                    <Button
                        onClick={() => {
                            setIsEmpty(false);
                            setPage(1);
                            getItems({
                                page: 1,
                                positions: selectedPositions,
                                genders: selectedGenders,
                                stacks: selectedStacks,
                            });
                        }}
                    >
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
