import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-github';

const EditorComponent = () => {
  const code = `#include <stdio.h>

int main()
{
    printf("Welcome to <KIDDO/CODERS> ExerciseHub");
    printf("Exercises For Intermediate");
    return 0;
}`;

  return (
    <div style={{ position: 'relative', borderLeft: '4px solid #FFA500' }}>
      <AceEditor
        mode="c_cpp"
        name="code_editor"
        theme="github"
        width="100%"
        height="177px"
        fontSize={18}
        showPrintMargin={false}
        showGutter={false}
        readOnly={true}
        value={code}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
        }}
        editorProps={{ $blockScrolling: Infinity }}
      />
    </div>
  );
};

export default EditorComponent;
