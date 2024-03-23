import { Label } from '@shared/kit/label'
import { Header } from '@shared/header'
import { CookProfile } from '@widgests/cabinet/studio/cook-profile'
import { PageBody } from '@shared/kit/page-body'
import { DishCreator } from '@widgests/dish/dish-creator'

const LeftLabel = <Label className="light-block" >Создание</Label>

export const DishCreatorPage = () => <>
    <Header LeftLabel={LeftLabel} RightLabel={<CookProfile/>} />
    <PageBody>
        <DishCreator />
    </PageBody>
</>
        