import React from 'react';
import ReadOnlyGistFile from './ReadOnlyGistFile';

function GistFiles(props) {
    const files = props.files.map((file, i) => {
        return (
            <ReadOnlyGistFile
                key={file.filename}
                filename={file.filename}
                value={file.content}
                editorId={`editor${i}`}
            />
        );
    });
    
    return (
        <div className='gist-files'>
            {files}
        </div>
    );
}

export default GistFiles;
