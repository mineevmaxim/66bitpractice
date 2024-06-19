import {
    Gender,
    GenderDto,
    Position,
    PositionDto,
} from 'entities/Employee/model/types/employee.ts';

export const mapPositionDtoToPosition: Record<PositionDto, Position> = {
    'Frontend-разработчик': 'Frontend',
    'Backend-разработчик': 'Backend',
    'Менеджер': 'Manager',
    'Аналитик': 'Analyst',
    'Дизайнер': 'Designer',
};

export const mapGenderDtoToGender: Record<GenderDto, Gender> = {
    'Женщина': 'female',
    'Мужчина': 'male'
};
