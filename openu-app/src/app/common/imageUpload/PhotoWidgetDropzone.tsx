import {useCallback} from 'react'
import {useDropzone, FileWithPath} from 'react-dropzone'
import { Header, Icon } from 'semantic-ui-react';

interface Props {
    setFiles: (files: any) => void;
}

export default function PhotoWidgetDropzone({setFiles}: Props) {
    const dzstyles = {
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        paddingTop: '30px',
        textAlign: 'center' as 'center',
        height: 200
    }

    const dzactive = {
        borderColor: 'green'
    }

  const onDrop = useCallback((acceptedFiles : FileWithPath[]) => {
    setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
        preview: URL.createObjectURL(file)
    })))
}, [setFiles])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} style= {isDragActive ? {...dzstyles,...dzactive}: dzstyles}>
      <input {...getInputProps()} />
      <Icon name='upload' size='huge'/>
      <Header content='Drop image here'/>
    </div>
  )
}