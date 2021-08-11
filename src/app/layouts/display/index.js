import { Box, useColorModeValue } from '@chakra-ui/react'
import Table from 'app/layouts/table'
import Process from 'app/layouts/process'
import Form from 'app/layouts/form'
import Dashboard from 'app/layouts/dashboard'
import DisplayDrawer from './drawer'
import Dialog from 'app/layouts/display/dialog'
import Toast from './toast'
import Detail from 'app/SBE/detail'
import Navigation from '../navigation'
import DeveloperConsole, { isDev } from 'utils/developer'
import ErrorBoundary from 'utils/developer/ErrorBoundary'
import { onSendMessage } from 'vertx'
import { useSelector } from 'react-redux'
import { selectDisplay } from 'redux/app/selectors'
import { includes } from 'ramda'

const Display = () => {
  const display = useSelector(selectDisplay)

  const backgroundColor = useColorModeValue('gray.50', '')
  window.onpopstate = event => {
    try {
      onSendMessage(event.state.state.data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <ErrorBoundary>
      <Box
        backgroundColor={backgroundColor}
        id="main-display"
        position="fixed"
        left="0"
        right="0"
        top="0"
        bottom="0"
        overflow="scroll"
      >
        <Navigation />
        <Box paddingTop="6rem">
          {display === 'DASHBOARD' && <Dashboard />}
          {display === 'TABLE' && <Table />}
          {display === 'PROCESS' && <Process />}
          {includes('FORM', display || '') && <Form />}
          {display === 'DETAIL' && <Detail />}
          {display === 'MAP' && <Table mapSearch />}
          <DisplayDrawer />
          <Dialog />
          <Toast />
        </Box>
        {isDev ? <DeveloperConsole /> : null}
        {/* <LogrocketIdentifier /> */}
      </Box>
    </ErrorBoundary>
  )
}

export default Display
