import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './Tab.module.scss';
import { Text } from '../Text/Text.tsx';
import CloseIcon from 'shared/assets/icons/close.svg';
import { Icon } from '../Icon/Icon.tsx';

interface TabProps {
    className?: string;
    text: string;
    onClose?: () => void;
}

export const Tab = memo((props: TabProps) => {
    const { className, text, onClose } = props;

    return (
        <div className={classNames(cls.Tab, {}, [className])}>
            <Icon
                clickable
                Svg={CloseIcon}
                height={10}
                width={10}
                onClick={onClose ?? (() => {})}
            />
            <Text
                text={text}
                size={'md'}
            />
        </div>
    );
});
