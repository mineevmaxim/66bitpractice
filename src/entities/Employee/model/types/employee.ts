export type Gender = 'male' | 'female';
export type Position = 'Frontend' | 'Backend' | 'Analyst' | 'Manager' | 'Designer';
export type Stack = 'CSharp' | 'React' | 'Java' | 'PHP' | 'Word' | 'Figma';
export type GenderDto = 'Мужчина' | 'Женщина';
export type PositionDto =
    | 'Frontend-разработчик'
    | 'Backend-разработчик'
    | 'Аналитик'
    | 'Менеджер'
    | 'Дизайнер';
export type StackDto = 'Мужчина' | 'Женщина';

export interface Employee {
    id: number;
    name: string;
    photo: string;
    phone: string;
    gender: Gender;
    position: Position;
    stack: Stack[];
    birthdate: string;
    dateOfEmployment: string;
}
