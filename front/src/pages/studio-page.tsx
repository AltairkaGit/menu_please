import { Label } from '@shared/ui/label'
import { PageBody } from '@shared/ui/page-body'
import { Header } from '@widgests/cabinet/shared/header'
import { CookProfile } from '@widgests/cabinet/studio/cook-profile'

const LeftLabel = <Label className="light-block" >Ваши блюда</Label>

export const StudioPage = () => <>
    <Header LeftLabel={LeftLabel} RightLabel={<CookProfile/>} />
    <PageBody>

    </PageBody>
</>
        