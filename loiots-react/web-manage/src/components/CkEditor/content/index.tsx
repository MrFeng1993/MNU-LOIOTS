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
  const { onChange, value } = props
  useEffect(() => {
    ClassicEditor
      .create(document.querySelector('#editor'), {
        extraPlugins: [MyCustomUploadAdapterPlugin],
        toolbar: ["undo", "redo", "|", "alignment", "bold", "italic", "blockQuote", "imageTextAlternative", "imageUpload", "heading", "link", "numberedList", "bulletedList"],
        // plugins: [Code],
        // extraPlugins: [BoldTest],
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
        value && editor.setData(value);
        editor.model.document.on('change:data', (data) => {
          onChange(editor.getData())
          console.log('您在写什么', editor.getData());
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
