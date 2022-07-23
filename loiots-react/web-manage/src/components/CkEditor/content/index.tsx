import { useEffect } from 'react';
import ClassicEditor from 'lee-editor'
// 中文包
import 'lee-editor/build/translations/zh-cn';
import MyUploadAdapter from "../upload";


function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = loader => {
    return new MyUploadAdapter(loader);
  };
}

let newEditor = null

const Ckeditor = (props) => {
  const { onChange, initialValue } = props

  useEffect(() => {
    initialValue && newEditor.setData(initialValue.toString())
  }, [initialValue])

  useEffect(() => {
    ClassicEditor
      .create(document.querySelector('#editor'), {
        extraPlugins: [MyCustomUploadAdapterPlugin],
      })
      .then(editor => {
        newEditor = editor
        editor.model.document.on('change:data', (data) => {
          onChange(editor.getData())
        });
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
