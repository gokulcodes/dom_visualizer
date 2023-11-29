"use client";

import { useEffect, useRef, useState } from "react";

import Editor from "@monaco-editor/react";
import Tree from "react-d3-tree";

export default function Home() {
  const codeRef = useRef<HTMLIFrameElement>(null);
  const domRef = useRef<HTMLInputElement>(null);
  const [codeStorage, setCodeStorage] = useState<string>("");
  const [rootRef, setRootRef] = useState<Array>([]);

  function onChange(e: string) {
    setCodeStorage(e);
  }

  useEffect(() => {
    const iframeDoc = document.getElementById("preview");
    const rootNode = iframeDoc?.contentDocument?.children;

    function rootDFS(root: any): any {
      if (!root || root.length == 0) {
        return [];
      }
      let collections = [];
      for (let child of root) {
        let node = {};
        node.name = child.localName;
        node.children = rootDFS(child.children);
        collections.push(node);
      }

      return collections;
    }

    setRootRef(rootDFS(rootNode));
  }, [codeStorage]);

  function handleEditorValidation(markers) {
    // model markers
    markers.forEach((marker) => console.log("onValidate:", marker.message));
  }

  return (
    <div className="root">
      <main className="sub-root">
        <section id="coding-area" className="sub-root_section">
          <Editor
            height="95vh"
            defaultLanguage="html"
            theme="vs-dark"
            onChange={onChange}
            defaultValue="// let's write some broken code 😈"
            onValidate={handleEditorValidation}
          />
        </section>

        <section ref={domRef} className="sub-root_section">
          <div className="dom-visualizer ">
            <iframe id="preview" ref={codeRef} srcDoc={codeStorage}>
              <p>Browser does not support iframes.</p>
            </iframe>
            {rootRef.length > 0 ? (
              <div id="treeWrapper">
                <Tree data={rootRef} />
              </div>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
}
