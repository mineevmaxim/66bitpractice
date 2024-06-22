import { Gender, GenderDto, Position, PositionDto, Stack, StackDto } from '../types/employee.ts';

export const mapPositionToPositionDto: Record<Position, PositionDto> = {
    Frontend: 'Frontend-разработчик',
    Backend: 'Backend-разработчик',
    Manager: 'Менеджер',
    Analyst: 'Аналитик',
    Designer: 'Дизайнер',
};

export const mapGenderToGenderDto: Record<Gender, GenderDto> = {
    Male: 'Мужчина',
    Female: 'Женщина',
};

export const mapStackDtoToStack: Record<Stack, StackDto> = {
    CSharp: 'C#',
    PHP: 'PHP',
    Figma: 'Figma',
    Word: 'Word',
    Java: 'Java',
    React: 'React',
};
