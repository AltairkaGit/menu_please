import { Label } from '@shared/kit/label'
import { PageBody } from '@shared/kit/page-body'
import { Header } from '@shared/header'
import { UserProfile } from '@widgests/cabinet/dashboard/user-profile'
import { DishList } from '@widgests/cabinet/dashboard/dish-list'
import { NewListButton } from '@features/menu/new-list-button'
import { ScrollRestoration } from 'react-router-dom'

const LeftLabel = <Label className="light-block" >Ваши меню</Label>

export const DashboardPage = () => <>
    <Header LeftLabel={LeftLabel} RightLabel={<UserProfile/>} />
    <PageBody>
        <NewListButton />
        <DishList />
        <ScrollRestoration />
    </PageBody>
</>