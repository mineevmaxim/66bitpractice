import cls from './Card.module.scss';
import { Text } from '../Text/Text.tsx';
import { HStack } from '../Stack/HStack/HStack.tsx';

interface CardProps {
    text: string;
}

export const Card = ({ text }: CardProps) => {
    return (
        <HStack className={cls.Card}>
            <Text
                text={text}
                size={'md'}
            />
        </HStack>
    );
};
