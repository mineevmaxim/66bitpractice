import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './Tab.module.scss';
import { Text } from 'shared/ui/Text/Text.tsx';

interface TabProps {
    className?: string;
    text: string;
}

export const Tab = memo((props: TabProps) => {
    const { className, text } = props;

    return (
        <div className={classNames(cls.Tab, {}, [className])}>
            <Text
                text={text}
                size={'md'}
            />
        </div>
    );
});
