import { Label } from '@shared/ui/label'
import { PageBody } from '@shared/ui/page-body'
import { Header } from '@widgests/cabinet/shared/header'
import { UserProfile } from '@widgests/cabinet/dashboard/user-profile'
import { DishList } from '@widgests/cabinet/dashboard/dish-list'
import { NewListButton } from '@features/menu/ui/new-list-button'
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