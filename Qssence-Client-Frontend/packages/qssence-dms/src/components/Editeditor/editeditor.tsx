
import { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { EditorConfig } from '@ckeditor/ckeditor5-core';

import {
  DecoupledEditor,
    AccessibilityHelp,
    Alignment,
    Autoformat,
    AutoImage,
    AutoLink,
    Autosave,
    Base64UploadAdapter,
    Bold,
    Essentials,
    FindAndReplace,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    Heading,
    HorizontalLine,
    ImageBlock,
    ImageCaption,
    ImageInline,
    ImageInsert,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    List,
    ListProperties,
    Markdown,
    MediaEmbed,
    Mention,
    Paragraph,
    PasteFromMarkdownExperimental,
    PasteFromOffice,
    SelectAll,
    SpecialCharacters,
    Strikethrough,
    Subscript,
    Superscript,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextTransformation,
    TodoList,
    Underline,
    Undo
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import './App.css'


export default function Editeditor({doccontent}) {
    const editorContainerRef = useRef(null);
    const editorMenuBarRef = useRef(null);
    const editorToolbarRef = useRef(null);
    const editorRef = useRef(null);

    const recogitoInstance = useRef(null);
    const [editorData, setEditorData] = useState('');
    const [balloonToolbarVisible, setBalloonToolbarVisible] = useState(false);
    const [selectionRange, setSelectionRange] = useState(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const [docContent, setdocContent]=useState(doccontent)





    useEffect(() => {
      setIsLayoutReady(true);
  
      return () => setIsLayoutReady(false);
    }, []);

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
        setdocContent(data)
    };

   
    const editorConfig = {
        toolbar: {
            items: [
                'undo',
                'redo',
                '|',
                'findAndReplace',
                '|',
                'heading',
                '|',
                'fontSize',
                'fontFamily',
                'fontColor',
                'fontBackgroundColor',
                '|',
                'bold',
                'italic',
                'underline',
                'subscript',
                'superscript',
                '|',
                'link',
                'insertImage',
                'insertImageViaUrl',
                'mediaEmbed',
                'insertTable',
                '|',
                'alignment',
                '|',
                'bulletedList',
                'numberedList',
                'todoList',
                'outdent',
                'indent'
            ],
            shouldNotGroupWhenFull: false
        },
        plugins: [
            DecoupledEditor as any,
            AccessibilityHelp,
            Alignment,
            Autoformat,
            AutoImage,
            AutoLink,
            Autosave,
            Base64UploadAdapter,
            Bold,
            Essentials,
            FindAndReplace,
            FontBackgroundColor,
            FontColor,
            FontFamily,
            FontSize,
            Heading,
            HorizontalLine,
            ImageBlock,
            ImageCaption,
            ImageInline,
            ImageInsert,
            ImageInsertViaUrl,
            ImageResize,
            ImageStyle,
            ImageTextAlternative,
            ImageToolbar,
            ImageUpload,
            Indent,
            IndentBlock,
            Italic,
            Link,
            LinkImage,
            List,
            ListProperties,
            Markdown,
            MediaEmbed,
            Mention,
            Paragraph,
            PasteFromMarkdownExperimental,
            PasteFromOffice,
            SelectAll,
            SpecialCharacters,
            Strikethrough,
            Subscript,
            Superscript,
            Table,
            TableCaption,
            TableCellProperties,
            TableColumnResize,
            TableProperties,
            TableToolbar,
            TextTransformation,
            TodoList,
            Underline,
            Undo
        ],
        fontFamily: {
            supportAllValues: true
        },
        fontSize: {
            options: [10, 12, 14, 'default', 18, 20, 22],
            supportAllValues: true
        },
        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
            ]
        },
        image: {
            toolbar: [
                'toggleImageCaption',
                'imageTextAlternative',
                '|',
                'imageStyle:inline',
                'imageStyle:wrapText',
                'imageStyle:breakText',
                '|',
                'resizeImage'
            ]
        },
        link: {
            addTargetToExternalLinks: true,
            defaultProtocol: 'https://',
            decorators: {
                toggleDownloadable: {
                    mode: 'manual',
                    label: 'Downloadable',
                    attributes: {
                        download: 'file'
                    }
                }
            }
        },
        placeholder: 'Type or paste your content here!',
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        }
    } as any;


    return (
      <>
         
        <div className="app">
            <div className="main-container">
                <div className="editor-container" ref={editorContainerRef}>
                    <div className="editor-container__menu-bar" ref={editorMenuBarRef}></div>
                    <div className="editor-container__toolbar" ref={editorToolbarRef}></div>
                   <div style={{height:"520px",overflow:'scroll'}}>
                     <div  ref={editorRef}>
                              {isLayoutReady && (
                                <CKEditor
                                data={docContent}
                                onChange={handleEditorChange}
                       
                                  onReady={editor => {
                                    editorToolbarRef.current.appendChild(editor.ui.view.toolbar.element);
                                    editorMenuBarRef.current.appendChild(editor.ui.view.menuBarView.element);
                                  }}
                                  onAfterDestroy={() => {
                                    Array.from(editorToolbarRef.current.children).forEach(child => {
                                      (child as HTMLElement).remove(); // Type assertion to HTMLElement
                                    });
                                    Array.from(editorMenuBarRef.current.children).forEach(child => {
                                      (child as HTMLElement).remove(); // Type assertion to HTMLElement
                                    });
                                  }}
                                  editor={DecoupledEditor as any}
                                  config={editorConfig as any}
                                />
                              )}
                            </div>
                            </div>
                            </div>
            </div>

        </div>

        </>
    );
}