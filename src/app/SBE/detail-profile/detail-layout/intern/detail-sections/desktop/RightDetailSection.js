import { VStack } from '@chakra-ui/layout'

import 'app/layouts/components/css/hide-scroll.css'
import Header from 'app/SBE/detail-profile/detail-layout/intern/detail-sections/desktop/template/Header.js'
import {
  InternshipPreferenceSection,
  InternshipSection,
  ExperienceSection,
} from 'app/SBE/detail-profile/detail-layout/intern/detail-sections/desktop/template/ProfileSections.js'

const RightDetail = ({ beCode }) => {
  return (
    <VStack flex="1" m={3} mb={8} spacing={6}>
      <Header beCode={beCode} />
      <InternshipPreferenceSection beCode={beCode} />
      <InternshipSection beCode={beCode} />
      <ExperienceSection beCode={beCode} />
    </VStack>
  )
}

export default RightDetail
