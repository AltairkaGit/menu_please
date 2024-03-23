import { Label } from '@shared/kit/label'
import { Header } from '@shared/header'
import { CookProfile } from '@widgests/cabinet/studio/cook-profile'
import { PageBody } from '@shared/kit/page-body'

const LeftLabel = <Label className="light-block" >Редактирование</Label>

export const DishEditorPage = () => <>
    <Header LeftLabel={LeftLabel} RightLabel={<CookProfile/>} />
    <PageBody>
        Editor
    </PageBody>
</>
        