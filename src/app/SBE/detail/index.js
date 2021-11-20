import { useSelector } from 'react-redux'
import { selectDetail } from 'redux/app/selectors'
import { selectCode } from 'redux/db/selectors'
import Intern from 'app/SBE/detail-profile/intern'
import Company from './company'
import Internship from 'app/SBE/detail-profile/internship'
import Rep from './rep'
import Agent from './agent'
import EduProDetail from './edu_pro'
import DefaultView from './default-view'
import getDetailType from './helpers/get-detail-type'
import Application from 'app/SBE/detail-profile/application'
import PCMTemplate from 'app/SBE/detail-profile/pcm-template'
import { head, compose, map, includes, filter } from 'ramda'

const BaseEntityDetail = ({ targetCode, defaultView }) => {
  const code = useSelector(selectDetail)
  const displayMode = useSelector(selectCode(code, 'SCH_DISPLAY_MODE'))
  const displayType = getDetailType(displayMode?.value)

  const beCode = head(useSelector(selectCode(code, 'rows')) || [targetCode])
  const allAttributesList = useSelector(selectCode(beCode, 'allAttributes'))

  const positionFromAttribute = compose(
    map(({ attributeCode, value }) => ({ attributeCode: attributeCode, position: value })),
    filter(({ attributeCode }) => includes('PRI_')(attributeCode)),
  )(allAttributesList || [])

  if (defaultView) return <DefaultView sbeCode={code} targetCode={beCode} />
  if (displayType === 'CV') {
    return (
      <PCMTemplate
        sbeCode={code}
        targetCode={beCode}
        positionFromAttribute={positionFromAttribute}
        allAttributesList={allAttributesList}
      />
    )
  }
  if (displayType === 'CV') {
    return (
      <PCMTemplate
        sbeCode={code}
        targetCode={beCode}
        positionFromAttribute={positionFromAttribute}
        allAttributesList={allAttributesList}
      />
    )
  }

  if (displayType === 'COMPANY') {
    return <Company sbeCode={code} targetCode={beCode} />
  }

  if (displayType === 'INTERNSHIP') {
    return <Internship sbeCode={code} targetCode={beCode} />
  }

  if (displayType === 'APPLICATION') {
    return <Application sbeCode={code} targetCode={beCode} />
  }

  if (displayType === 'REP') {
    return <Rep sbeCode={code} targetCode={beCode} />
  }

  if (displayType === 'AGENT') {
    return <Agent sbeCode={code} targetCode={beCode} />
  }

  if (displayType === 'EDU_PRO') {
    return <EduProDetail sbeCode={code} targetCode={beCode} />
  }

  return <DefaultView sbeCode={code} targetCode={beCode} />
}

export default BaseEntityDetail
