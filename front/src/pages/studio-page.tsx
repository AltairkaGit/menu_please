import { Label } from '@shared/kit/label'
import { Header } from '@shared/header'
import { CookProfile } from '@widgests/cabinet/studio/cook-profile'
import { CookerDishes } from '@widgests/cabinet/studio/cooker-dishes'
import { motion } from 'framer-motion'
import { PageBody } from '@shared/kit/page-body'

const LeftLabel = <Label className="light-block" >Ваши блюда</Label>

export const StudioPage = () => <>
    <Header LeftLabel={LeftLabel} RightLabel={<CookProfile/>} />
    <PageBody>
        <CookerDishes />
    </PageBody>
</>
        