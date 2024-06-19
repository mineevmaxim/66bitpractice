import { ButtonHTMLAttributes } from 'react';
import cls from './Button.module.scss';
import { classNames } from '../../lib/classNames/classNames';

export type ButtonVariant = 'primary' | 'clear';

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
    className?: string;
    variant?: ButtonVariant;
    disabled?: boolean;
    max?: boolean;
}

export const Button = (props: ButtonProps) => {
    const {
        className,
        variant = 'primary',
        disabled = false,
        children,
        max = false,
        ...otherProps
    } = props;

    const mods: Record<string, boolean> = {
        [cls.disabled]: disabled,
        [cls.max]: max,
    };

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [className, cls[variant]])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
};
