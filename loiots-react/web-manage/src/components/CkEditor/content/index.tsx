import { useEffect } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn';
import MyUploadAdapter from "../upload";


function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = loader => {
    return new MyUploadAdapter(loader);
  };
}

let newEditor = null

const Ckeditor = (props) => {

  const { onChange, value, initialValue } = props

  console.log('initialValue', initialValue);

  useEffect(() => {
    initialValue && newEditor.setData(initialValue.toString())
  }, [initialValue])

  useEffect(() => {
    ClassicEditor
      .create(document.querySelector('#editor'), {
        extraPlugins: [MyCustomUploadAdapterPlugin],
        mediaEmbed: {
          previewsInData: true
        },
        language: {
          ui: 'zh-cn',
          content: 'zh-cn',
        },
        data: '<p>请开始创作吧</p>'
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
