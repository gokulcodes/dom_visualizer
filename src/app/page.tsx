"use client"

import { useRef } from "react"

export default function Home() {
  const codeRef = useRef<HTMLTextAreaElement>(null)
  const domRef = useRef<HTMLInputElement>(null)

  function onCodeChange() {
    if (domRef.current && codeRef.current) {
      domRef.current.insertAdjacentHTML("afterbegin", codeRef.current.value)
    }
  }

  return (
    <div className="root">
      <main className="sub-root">

        <section id="coding-area" className="sub-root_section" >
          <textarea autoFocus ref={codeRef} className="code_textarea" >
          </textarea>
          <button onClick={onCodeChange} className="code_run_button" >Run</button>
        </section>

        <section ref={domRef} id="coding-area" className="sub-root_section" >
          <div className="dom-visualizer ">

          </div>
        </section>

      </main>
    </div>
  )
}
