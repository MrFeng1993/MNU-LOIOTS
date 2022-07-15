import { useEffect } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn';
import MyUploadAdapter from "../upload";
import str from '../config';


function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = loader => {
    return new MyUploadAdapter(loader);
  };
}

const Ckeditor = (props) => {
  const { content } = props
  useEffect(() => {
    const editorId = ClassicEditor
      .create(document.querySelector('#editor'), {
        toolbar: []
      })
      .then(editor => {
        const loadingLock = Symbol();
        editor.setData(content);
        (editor as any)['enableReadOnlyMode'](loadingLock);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  return (
    <div className="App">
      <div id="editor" />
    </div>
  );
};

export default Ckeditor;
