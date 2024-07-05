import React from 'react'
import { Editor } from '@tinymce/tinymce-react';

const MarkDown = ({label, value, changeValue, name}) => {
    return (
        <>
            <span className="block mb-2 text-sm font-medium text-white">{label}</span>
            <Editor
                apiKey='89bkg104blfqtxvtc0aj7aj2ja1zf0mv0sz4j4382isvg4ym'
                initialValue={value}
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onChange={e => changeValue(prev => ({...prev, [name]: e.target.getContent()}))}
            />
        </>
    )
}

export default MarkDown