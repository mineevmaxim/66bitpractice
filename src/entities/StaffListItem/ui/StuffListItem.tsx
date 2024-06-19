import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './StuffListItem.module.scss';
import { Employee } from 'entities/Employee/model/types/employee.ts';
import { Text } from 'shared/ui/Text/Text.tsx';
import { Link } from 'react-router-dom';
import { RoutePath } from 'app/providers/router/routeConfig.tsx';

interface StuffListItemProps {
    className?: string;
    employee?: Employee;
    isHeader?: boolean;
}

export const StuffListItem = memo((props: StuffListItemProps) => {
    const { className, isHeader = false, employee } = props;

    if (isHeader) {
        return (
            <div className={classNames(cls.StuffListItem, {}, [cls.header, className])}>
                <Text
                    text={'ФИО'}
                    variant={'secondary'}
                    className={cls.item}
                />
                <Text
                    text={'Должность'}
                    variant={'secondary'}
                    className={cls.item}
                />
                <Text
                    text={'Телефон'}
                    variant={'secondary'}
                    className={cls.item}
                />
                <Text
                    text={'Дата рождения'}
                    variant={'secondary'}
                    className={cls.item}
                />
            </div>
        );
    }

    return (
        <Link
            to={RoutePath.staff_details + employee?.id}
            className={classNames(cls.StuffListItem, {}, [className])}
        >
            <Text
                text={employee?.name}
                variant={'primary'}
                className={cls.item}
            />
            <Text
                text={employee?.position}
                variant={'primary'}
                className={cls.item}
            />
            <Text
                text={employee?.phone}
                variant={'primary'}
                className={cls.item}
            />
            <Text
                text={employee?.birthdate}
                variant={'primary'}
                className={cls.item}
            />
        </Link>
    );
});
