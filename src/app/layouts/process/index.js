import { useSelector } from 'react-redux'
import { selectProcess } from 'redux/app/selectors'
import Lane from 'app/SBE/lane'
import { Stack, VStack, HStack } from '@chakra-ui/react'
import Search from 'app/SBE/search/Search'
import Form from '../form'
import { selectCode } from 'redux/db/selectors'

const Process = ({ dashboard }) => {
  const processCodes = useSelector(selectProcess)

  const processSearch = useSelector(selectCode('QUE_BUCKET_INTERNS_GRP', 'QUE_SELECT_INTERN'))
  if (!processCodes) return null
  return (
    <VStack align="start" spacing={0} px="5">
      {!dashboard && (
        <HStack>
          <Search process={processCodes[0]} sbeCode={JSON.stringify(processCodes)} />
        </HStack>
      )}
      <Stack direction={dashboard ? 'column-reverse' : 'row'} spacing={5}>
        {processCodes.map(sbeCode => (
          <Lane key={sbeCode} sbeCode={sbeCode} dashboard={dashboard} />
        ))}
      </Stack>
    </VStack>
  )
}

export default Process
