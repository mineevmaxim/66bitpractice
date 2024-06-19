import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useMemo } from 'react';
import cls from './StaffList.module.scss';
import { VStack } from 'shared/ui/Stack/VStack/VStack.tsx';
import { StuffListItem } from 'entities/StaffListItem';
import { Employee } from 'entities/Employee/model/types/employee.ts';

interface StaffListProps {
    className?: string;
    employees?: Employee[];
}

export const StaffList = memo((props: StaffListProps) => {
    const { className, employees } = props;

    const itemsList = useMemo(
        () => (
            <>
                <StuffListItem
                    isHeader
                    className={cls.header}
                />
                <VStack
                    max
                    className={cls.items}
                >
                    {employees?.map((employee) => <StuffListItem employee={employee} />)}
                </VStack>
            </>
        ),
        [employees],
    );

    return (
        <VStack
            max
            className={classNames(cls.StaffList, {}, [className])}
        >
            {itemsList}
        </VStack>
    );
});
