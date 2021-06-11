import { useSelector } from 'react-redux'
import { VStack, HStack, Spacer, useColorModeValue, Flex } from '@chakra-ui/react'

import DetailCards from 'app/layouts/dashboard/timeline/templates/DetailCards'
import Attribute from 'app/BE/attribute'
import {
  personalDetails,
  professionalDetails,
  preference,
} from 'app/layouts/dashboard/timeline/templates/CardContent'
import { selectCode } from 'redux/db/selectors'
import { selectMentee } from 'redux/db/selectors'

const DetailView = () => {
  const menteeCodes = useSelector(selectMentee)
  const mentee = menteeCodes?.[0]
  const name = useSelector(selectCode(mentee, 'PRI_NAME'))?.value
  const bg = useColorModeValue('gray.100', 'gray.700')

  return (
    <Flex
      w="50vw"
      bg={bg}
      spacing={4}
      p="3"
      overflowY="scroll"
      top="10vh"
      flexDirection="column"
      justifyContent="space-around"
      alignItems="center"
    >
      <VStack mb={5}>
        <Attribute config={{ size: 'xl', name: name }} code={mentee} attribute="PRI_IMAGE_URL" />
        <Spacer />
        <Attribute config={{ textStyle: 'head.3' }} code={mentee} attribute="PRI_NAME" />
      </VStack>
      <HStack w="90%" mb={5}>
        <DetailCards detailsection={personalDetails} currentMentor={mentee} miniCard />
        <DetailCards detailsection={professionalDetails} currentMentor={mentee} miniCard />
      </HStack>
      <DetailCards detailsection={preference} currentMentor={mentee} />
    </Flex>
  )
}

export default DetailView
