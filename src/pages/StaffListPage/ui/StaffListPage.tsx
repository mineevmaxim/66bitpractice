import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import cls from './StaffListPage.module.scss';
import { Page } from 'widgets/Page';
import { Text } from 'shared/ui/Text/Text.tsx';
import { VStack } from 'shared/ui/Stack/VStack/VStack.tsx';
import { Input } from 'shared/ui/Input/Input.tsx';
import { Button } from 'shared/ui/Button/Button.tsx';
import {
    EmployeeDto,
    Gender,
    mapGenderToGenderDto,
    mapPositionToPositionDto,
    mapStackDtoToStack,
    Position,
    Stack,
} from 'entities/Employee';
import axios from 'axios';
import { StaffList } from 'features/StaffList';
import { Select, SelectItem } from 'shared/ui/Select/Select.tsx';
import { Tab } from 'shared/ui/Tab/Tab.tsx';

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
    const [query, setQuery] = useState<string>('');
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

    const onChangePosition = ({ value }: SelectItem<Position>) => {
        setSelectedPositions((prev) => {
            if (prev.includes(value)) {
                return [...prev].filter((item) => item !== value);
            }
            return [...prev, value];
        });
    };

    const onChangeStack = ({ value }: SelectItem<Stack>) => {
        setSelectedStacks((prev) => {
            if (prev.includes(value)) {
                return [...prev].filter((item) => item !== value);
            }
            return [...prev, value];
        });
    };

    const onChangeGender = ({ value }: SelectItem<Gender>) => {
        setSelectedGenders((prev) => {
            if (prev.includes(value)) {
                return [...prev].filter((item) => item !== value);
            }
            return [...prev, value];
        });
    };

    const onChangeQuery = (value: string) => {
        setQuery(value);
    };

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
                    name: query,
                })
            }
        >
            <div className={classNames(cls.container, {}, [cls.inputsContainer])}>
                <p className={cls.title}>Список сотрудников</p>
                <div className={cls.selects}>
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
                </div>
                <Input
                    placeholder={'Поиск'}
                    value={query}
                    onChange={onChangeQuery}
                    className={cls.search}
                />
            </div>
            <div className={cls.filters}>
                <div className={classNames(cls.cards, {}, [cls.container])}>
                    <div className={cls.filtersText}>Выбранные фильтры:</div>
                    <div className={cls.tabs}>
                        {selectedPositions.map((pos) => (
                            <Tab
                                text={mapPositionToPositionDto[pos]}
                                key={pos}
                                onClose={() => onChangePosition({ value: pos, title: pos })}
                            />
                        ))}
                        {selectedGenders.map((gen) => (
                            <Tab
                                text={mapGenderToGenderDto[gen]}
                                key={gen}
                                onClose={() => onChangeGender({ value: gen, title: gen })}
                            />
                        ))}
                        {selectedStacks.map((s) => (
                            <Tab
                                text={mapStackDtoToStack[s]}
                                key={s}
                                onClose={() => onChangeStack({ value: s, title: s })}
                            />
                        ))}
                    </div>
                    <Button
                        onClick={() => {
                            setIsEmpty(false);
                            setPage(1);
                            getItems({
                                page: 1,
                                positions: selectedPositions,
                                genders: selectedGenders,
                                stacks: selectedStacks,
                                name: query,
                            });
                        }}
                    >
                        <Text
                            variant={'inverted'}
                            text={'Найти'}
                        />
                    </Button>
                </div>
            </div>
            <VStack className={classNames(cls.container, {}, [cls.list])}>
                <StaffList employees={items} />
            </VStack>
        </Page>
    );
});

export default StaffListPage;
