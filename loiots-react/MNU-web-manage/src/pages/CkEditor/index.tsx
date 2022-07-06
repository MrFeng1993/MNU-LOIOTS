// @ts-nocheck
import React, { Component, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import str from './config'


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
                language: {
                    // The UI will be English.
                    ui: 'zh-cn',
        
                    // But the content will be edited in Arabic.
                    // content: 'zh-cn',
                },
                data: "<p>Hello from CKEditor 5!</p>"
            })
            .then(editor => {
                editor.setData(str)
                editor.model.document.on('change:data', (data) => {
                    console.log('The data has changed!', editor.getData());
                });
            })
            .catch(error => {
                console.log(error);
            });
    }, [])
    return (
        <div className="App">
            <div id="editor" />
        </div>
    )
}

export default Ckeditor;
