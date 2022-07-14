import { useEffect } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import BoldTest from './plugin-bold/main';
// plugins
// import Indent from '@ckeditor/ckeditor5-indent/src/indent';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
// import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
// import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
// import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
// import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
// plugins ---- end
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn';
import str from './config';


function MyUploadAdapterPlugin(editor: any) {
  // eslint-disable-next-line no-param-reassign
  editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
    console.log(loader);
    // ...
  };
};


const Ckeditor = () => {
  useEffect(() => {
    ClassicEditor
      .create(document.querySelector('#editor'), {
        // plugins: [Code],
        // extraPlugins: [BoldTest],
        mediaEmbed: {
          previewsInData: true
        },
        language: {
          // ui: 'zh-cn',
          // content: 'zh-cn',
        },
        data: '<p>请开始创作吧</p>'
      })
      .then(editor => {
        editor.setData(str);
        editor.model.document.on('change:data', (data) => {
          console.log('The data has changed!', editor.getData());
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  return (
    <div className="App">
      {/* <div dangerouslySetInnerHTML={{ __html: str }} ></div> */}
      <div id="editor" />
    </div>
  );
};

export default Ckeditor;
