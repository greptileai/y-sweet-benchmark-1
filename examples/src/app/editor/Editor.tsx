"use client"

import { useText } from "@/lib/provider"
import type { Editor } from "codemirror"
import 'codemirror/lib/codemirror.css'
import { useCallback, useRef } from "react"

export function CodeEditor() {
    const yText = useText('text')
    const editorRef = useRef<Editor | null>(null)

    const codeMirrorRef = useCallback(
        (ref: HTMLTextAreaElement | null) => {
            if (ref == null) {
                if (editorRef.current != null) {
                    ; (editorRef.current as any).toTextArea()
                    editorRef.current = null
                }
                return
            }

            // These libraries are designed to work in the browser, and will cause warnings
            // if imported on the server. Nextjs renders components on both the server and
            // the client, so we import them lazily here when they are used on the client.
            const CodeMirror = require('codemirror')
            const CodemirrorBinding = require('y-codemirror').CodemirrorBinding

            editorRef.current = CodeMirror.fromTextArea(ref, {
                lineNumbers: true
            })

            new CodemirrorBinding(yText!, editorRef.current)
        },
        [yText]
    )

    return (
        <div>
            <h1>CRDT Demo</h1>

            <div>
                <textarea ref={codeMirrorRef} />
            </div>
        </div>
    )
}
