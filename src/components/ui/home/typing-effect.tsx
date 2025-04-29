"use client"

import { useState, useEffect } from "react"

interface TypingEffectProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
}

export default function TypingEffect({ text, speed = 50, className = "", onComplete }: TypingEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    // Reset when text changes
    setDisplayText("")

    let i = 0
    // Use a simple timeout chain instead of state updates
    const typeNextChar = () => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1))
        i++
        setTimeout(typeNextChar, speed)
      } else {
        if (onComplete) onComplete()
      }
    }

    // Start typing
    setTimeout(typeNextChar, speed)

    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => {
      clearInterval(cursorInterval)
    }
  }, [text, speed, onComplete])

  return (
    <div className={`${className}`}>
      <span>{displayText}</span>
      <span
        className="inline-block"
        style={{
          width: "0.15em",
          height: "1.2em",
          backgroundColor: "currentColor",
          marginLeft: "2px",
          verticalAlign: "middle",
          opacity: showCursor ? 1 : 0,
          transition: "opacity 0.1s",
        }}
      />
    </div>
  )
}
