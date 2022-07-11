import { useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn';
import str from './config';


const Ckeditor = () => {
  useEffect(() => {
    // ClassicEditor.builtinPlugins = [
    //     Essentials,
    //     UploadAdapter,
    //     Autoformat,
    //     Bold,
    //     Italic,
    //     BlockQuote,
    //     EasyImage,
    //     Heading,
    //     Image,
    //     ImageCaption,
    //     ImageStyle,
    //     ImageToolbar,
    //     ImageUpload,
    //     Link,
    //     List,
    //     Paragraph,
    //     Alignment                                                            // <--- ADDED
    // ];
    ClassicEditor
      .create(document.querySelector('#editor'), {
        // toolbar: {
        //     items: [
        //         'heading',
        //         '|',
        //         'alignment',                                                 // <--- ADDED
        //         'bold',
        //         'italic',
        //         'link',
        //         'bulletedList',
        //         'numberedList',
        //         'uploadImage',
        //         'blockQuote',
        //         'undo',
        //         'redo'
        //     ]
        // },
        // image: {
        //     toolbar: [
        //         'imageStyle:inline',
        //         'imageStyle:block',
        //         'imageStyle:side',
        //         '|',
        //         'toggleImageCaption',
        //         'imageTextAlternative'
        //     ]
        // },
        // config
        mediaEmbed: {
          previewsInData: true
        },
        language: {
          // The UI will be English.
          // ui: 'zh-cn',

          // But the content will be edited in Arabic.
          // content: 'zh-cn',
        },
        data: '<p>Hello from CKEditor 5!</p>'
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
      {/* <div dangerouslySetInnerHTML = {{__html: str }} ></div> */}
      <div id="editor" />
    </div>
  );
};

export default Ckeditor;
