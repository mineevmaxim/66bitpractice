import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './Tab.module.scss';
import { Text } from '../Text/Text.tsx';
import CloseIcon from 'shared/assets/icons/close.svg';
import { Button } from '../Button/Button.tsx';

interface TabProps {
    className?: string;
    text: string;
    onClose?: () => void;
}

export const Tab = memo((props: TabProps) => {
    const { className, text, onClose } = props;

    return (
        <div className={classNames(cls.Tab, {}, [className])}>
            <Button
                variant={'clear'}
                onClick={onClose}
            >
                <CloseIcon />
            </Button>
            <Text
                text={text}
                size={'md'}
            />
        </div>
    );
});
