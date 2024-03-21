import { Label } from '@shared/kit/label'
import { PageBody } from '@shared/kit/page-body'
import { Header } from '@shared/header'
import { CookProfile } from '@widgests/cabinet/studio/cook-profile'

const LeftLabel = <Label className="light-block" >Ваши блюда</Label>

export const StudioPage = () => <>
    <Header LeftLabel={LeftLabel} RightLabel={<CookProfile/>} />
    <PageBody>

    </PageBody>
</>
        