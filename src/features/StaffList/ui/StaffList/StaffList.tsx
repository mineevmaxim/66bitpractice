import { classNames } from 'shared/lib/classNames/classNames.ts';
import { memo, useMemo } from 'react';
import cls from './StaffList.module.scss';
import { VStack } from 'shared/ui/Stack/VStack/VStack.tsx';
import { StaffListItem } from '../StaffListItem/StaffListItem';
import { EmployeeDto } from '/entities/Employee';

interface StaffListProps {
    className?: string;
    employees?: EmployeeDto[];
}

export const StaffList = memo((props: StaffListProps) => {
    const { className, employees } = props;

    const itemsList = useMemo(
        () => (
            <>
                <StaffListItem
                    isHeader
                    className={cls.header}
                />
                <VStack
                    max
                    className={cls.items}
                >
                    {employees?.map((employee) => (
                        <StaffListItem
                            key={employee.id}
                            employee={employee}
                        />
                    ))}
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
