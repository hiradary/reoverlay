import React, { useEffect } from "react"
import Prism from "prismjs"

import "./Code.css"

const Code = ({ code }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <div className="Code">
      <pre>
        <code className="language-js">{code.trim()}</code>
      </pre>
    </div>
  )
}

export { Code }
