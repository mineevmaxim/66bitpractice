import { ReactElement } from 'react';
import { Checkbox, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import cls from './Select.module.scss';
import { HStack } from '../Stack/HStack/HStack.tsx';
import ArrowDownIcon from 'shared/assets/icons/arrow-down.svg';
import CheckboxIcon from 'shared/assets/icons/checkbox.svg';
import { Text } from '../Text/Text.tsx';
import { classNames } from 'shared/lib/classNames/classNames.ts';

export type SelectItem<T extends string> = {
    title: string;
    value: T;
};

type SelectProps<T extends string> = {
    className?: string;
    items: SelectItem<T>[];
    placeholder?: ReactElement;
    selected: SelectItem<T> | null;
    onChange?: (selected: SelectItem<T>) => void;
};

export const Select = <T extends string>(props: SelectProps<T>) => {
    const { items, className, placeholder, onChange, selected } = props;
    return (
        <Menu>
            <MenuButton className={classNames(cls.placeholder, {}, [className])}>
                <HStack gap={'8'}>
                    {placeholder}
                    <ArrowDownIcon />
                </HStack>{' '}
            </MenuButton>
            <MenuItems
                anchor={'bottom end'}
                className={cls.Select}
            >
                {items.map((item) => (
                    <MenuItem
                        key={item.value}
                        as={'div'}
                        className={cls.item}
                    >
                        <HStack
                            justify={'between'}
                            gap={'16'}
                        >
                            <Text text={item.title} />
                            <Checkbox
                                className={cls.checkbox}
                                checked={selected?.value === item.value}
                                onChange={() => {
                                    onChange?.(item);
                                }}
                            >
                                {({ checked }) => {
                                    if (checked)
                                        return (
                                            <div className={cls.checked}>
                                                <CheckboxIcon />
                                            </div>
                                        );
                                    return <div className={cls.empty} />;
                                }}
                            </Checkbox>
                        </HStack>
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    );
};
