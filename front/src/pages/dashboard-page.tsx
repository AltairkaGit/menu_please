import { Label } from '@shared/ui/label'
import { PageBody } from '@shared/ui/page-body'
import { Header } from '@widgests/cabinet/shared/header'
import { UserProfile } from '@widgests/cabinet/dashboard/user-profile'
import { NewMenuButton } from '@entities/dish-list/ui/new-menu'

const LeftLabel = <Label className="light-block" >Ваши меню</Label>

export const DashboardPage = () => <>
    <Header LeftLabel={LeftLabel} RightLabel={<UserProfile/>} />
    <PageBody>
        <NewMenuButton onClick={() => console.log('added new menu')} />
    </PageBody>
</>