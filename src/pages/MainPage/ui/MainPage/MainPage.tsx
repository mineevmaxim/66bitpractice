import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './MainPage.module.scss';
import { Page } from 'widgets/Page/ui/Page.tsx';
import { Button } from 'shared/ui/Button/Button.tsx';
import { Text } from 'shared/ui/Text/Text.tsx';
import { Link } from 'react-router-dom';
import { RoutePath } from 'app/providers/router/routeConfig.tsx';

interface MainPageProps {
    className?: string;
}

const MainPage = memo((props: MainPageProps) => {
    const { className } = props;

    return (
        <Page
            grid
            className={classNames(cls.MainPage, {}, [className])}
        >
            <Button max>
                <Link
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    to={RoutePath['staff']}
                >
                    <Text
                        variant={'inverted'}
                        text={'Список сотрудников'}
                    />
                </Link>
            </Button>
        </Page>
    );
});

export default MainPage;
