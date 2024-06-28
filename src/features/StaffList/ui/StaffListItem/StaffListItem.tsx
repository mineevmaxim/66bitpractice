import { classNames } from 'shared/lib/classNames/classNames.ts';
import { memo } from 'react';
import cls from './StaffListItem.module.scss';
import { EmployeeDto } from '/entities/Employee';
import { Text } from 'shared/ui/Text/Text.tsx';
import { Link } from 'react-router-dom';
// eslint-disable-next-line ellepheria-plugin/layer-imports
import { RoutePath } from 'app/providers/router/routeConfig.tsx';
import { formatDate } from 'shared/lib/dates/dates.ts';

interface StuffListItemProps {
    className?: string;
    employee?: EmployeeDto;
    isHeader?: boolean;
}

export const StaffListItem = memo((props: StuffListItemProps) => {
    const { className, isHeader = false, employee } = props;

    if (isHeader) {
        return (
            <div className={classNames(cls.StuffListItem, {}, [cls.header, className])}>
                <Text
                    align={'left'}
                    text={'ФИО'}
                    variant={'secondary'}
                    className={cls.firstItem}
                />
                <Text
                    align={'left'}
                    text={'Должность'}
                    variant={'secondary'}
                    className={cls.firstItem}
                />
                <Text
                    align={'left'}
                    text={'Телефон'}
                    variant={'secondary'}
                    className={cls.item}
                />
                <Text
                    align={'left'}
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
                className={cls.firstItem}
            />
            <Text
                text={employee?.position}
                variant={'primary'}
                className={cls.firstItem}
            />
            <Text
                text={employee?.phone.replace('(', '').replace(')', '')}
                variant={'primary'}
                className={cls.item}
            />
            <Text
                text={formatDate(employee?.birthdate ?? '')}
                variant={'primary'}
                className={cls.item}
            />
        </Link>
    );
});
