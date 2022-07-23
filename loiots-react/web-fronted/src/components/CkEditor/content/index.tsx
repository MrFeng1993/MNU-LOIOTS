import { useEffect } from 'react';
import ClassicEditor from 'lee-editor';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn';
import MyUploadAdapter from "../upload";


const Ckeditor = (props) => {
  const { content } = props
  useEffect(() => {
    const editorId = ClassicEditor
      .create(document.querySelector('#editor'), {
        toolbar: []
      })
      .then(editor => {
        // const loadingLock = Symbol();
        editor.setData(content);
        editor.isReadOnly = true;
        editor.setReadOnly(true)
        // (editor as any)['enableReadOnlyMode'](loadingLock);
        // editor.enableReadOnlyMode(editorId);
        // editor.disableReadOnlyMode(editorId);
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
