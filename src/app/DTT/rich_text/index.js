import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
} from '@chakra-ui/react'
import { EditorState, convertFromHTML, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { stateToHTML } from 'draft-js-export-html'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faExpand } from '@fortawesome/free-solid-svg-icons'
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useIsMobile } from 'utils/hooks'
import DOMPurify from 'dompurify'

const Write = ({ questionCode, data, onSendAnswer, description }) => {
  const blocksFromHTML = convertFromHTML(data?.value || '')
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
  )

  const [dataValue, setDataValue] = useState(data?.value)
  const [edit, setEdit] = useState(!data?.value)
  const [editor, setEditor] = useState(
    !data?.value ? EditorState.createEmpty() : EditorState.createWithContent(state),
  )

  const isMobile = useIsMobile()

  useEffect(() => {
    if (data?.value !== dataValue) {
      setDataValue(data?.value)
      setEdit(false)
      setEditor(EditorState.createWithContent(state))
    }
  }, [data?.value, dataValue, edit, state])

  const handleSave = () => {
    onSendAnswer(stateToHTML(editor.getCurrentContent()))
    setEdit(false)
  }

  return edit ? (
    <Box
      test-id={questionCode}
      w={isMobile ? '80vw' : '2xl'}
      border="1px solid #E2E8F0"
      borderRadius="0.375rem"
      p="1rem"
    >
      <Editor
        toolbar={{
          options: ['fontSize', 'fontFamily', 'list', 'textAlign'],
        }}
        editorState={editor}
        onEditorStateChange={setEditor}
        placeholder={description}
        onBlur={handleSave}
      />
    </Box>
  ) : (
    <Box w="2xl" border="1px solid #E2E8F0" borderRadius="0.375rem" p="1rem">
      <div
        test-id={questionCode + '-saved'}
        style={{ padding: '1rem' }}
        dangerouslySetInnerHTML={{ __html: data.value }}
      />
      <Button
        test-id={questionCode + '-edit'}
        m="2"
        leftIcon={<FontAwesomeIcon icon={faEdit} />}
        onClick={() => setEdit(true)}
      >
        Edit
      </Button>
    </Box>
  )
}
const Read = ({ data, mini }) => {
  if (!data?.value) return null

  const cleanHtml = DOMPurify.sanitize(data.value)

  return mini ? (
    <Popover>
      <PopoverTrigger>
        <Button leftIcon={<FontAwesomeIcon icon={faExpand} />}>{data?.attributeName}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{data.attributeName}</PopoverHeader>
        <PopoverBody>
          <Box pl="4">
            <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  ) : (
    <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
  )
}

const RichText = {
  Write,
  Read,
}

export default RichText
