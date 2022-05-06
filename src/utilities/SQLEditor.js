import ace from "ace-builds";
import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

//*** SQL Editor - Important Props */
/* height */
/* width */
/* onChange */
/* onFocus */
/* value */
/* customDropDown   */

const Editor = (props) => {
  //LC-1081 Add parameter on cursor location - Set unique editor name
  const name = "sql_editor"+'_' +props.selectedRndIndex+'_' + props.dataNodeIndex;
  React.useEffect(() => {
    const langTools = ace.require("ace/ext/language_tools");
   
    // const sqlTables = [
    //   { caption: "users", value: "users", meta: "table" },
    //   { caption: "products", value: "products", meta: "table" },
    //   { caption: "id", value: "users.id", meta: "field" },
    //   { caption: "cost", value: "products.cost", meta: "field" }
    // ];

    const sqlTablesCompleter = {
      getCompletions: (editor, session, pos, prefix, callback) => {
        callback(
          null,
          props.customDropDown
        );
      }
    };
    langTools.addCompleter(sqlTablesCompleter);
  }, []);

  return (
    <AceEditor
      mode="sql"
      theme="github"
      name={name}
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showGutter:false,
        fontSize:"12pt"
      }}
      style={{height:props.height, width:props.width}}
      value={props.value}
      onChange={(e)=>props.callChange(e, props.dataNodeIndex)}
      onFocus={()=>props.callFocus(props.dataNodeIndex)}
    />
  );
};

export default Editor;
