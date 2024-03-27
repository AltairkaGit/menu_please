import { Label } from '@shared/kit/label'
import { Header } from '@shared/header'
import { CookProfile } from '@widgests/cabinet/studio/cook-profile'
import { PageBody } from '@shared/kit/page-body'
import { DishEditor } from '@widgests/dish/dish-editor'

const LeftLabel = <Label className="light-block" >Редактирование</Label>

export const DishEditorPage = () => <>
    <Header LeftLabel={LeftLabel} RightLabel={<CookProfile/>} />
    <PageBody>
        <DishEditor />
    </PageBody>
</>
        