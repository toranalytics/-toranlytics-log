import React, { useEffect, useRef } from "react"

const Sparkle = () => {
  const sparkles = 50
  const starsRef = useRef<Array<HTMLDivElement | null>>(
    Array(sparkles).fill(null)
  )
  const tinyRef = useRef<Array<HTMLDivElement | null>>(
    Array(sparkles).fill(null)
  )

  const animationFrameRef = useRef<number | null>(null)

  const newColour = () => {
    const c = [
      255,
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
    ].sort(() => 0.5 - Math.random())
    return `rgb(${c[0]}, ${c[1]}, ${c[2]})`
  }

  const createStarElements = () => {
    for (let i = 0; i < sparkles; i++) {
      const star = document.createElement("div")
      const tiny = document.createElement("div")

      star.style.cssText =
        "position:absolute;width:5px;height:5px;background-color:transparent;visibility:hidden;z-index:9999;"
      tiny.style.cssText =
        "position:absolute;width:2px;height:2px;background-color:transparent;visibility:hidden;z-index:9999;"

      document.body.appendChild(star)
      document.body.appendChild(tiny)

      starsRef.current[i] = star
      tinyRef.current[i] = tiny
    }
  }

  const updateStarsAndTiny = () => {
    starsRef.current.forEach((star, i) => {
      if (star && star.style.visibility === "visible") {
        const starY = parseInt(star.style.top, 10)
        const starX = parseInt(star.style.left, 10)

        if (starY < window.innerHeight + window.scrollY) {
          star.style.top = `${starY + 1 + Math.random() * 3}px`
          star.style.left = `${starX + ((i % 5) - 2) / 5}px`
        } else {
          star.style.visibility = "hidden"
        }
      }
    })

    tinyRef.current.forEach((tiny, i) => {
      if (tiny && tiny.style.visibility === "visible") {
        const tinyY = parseInt(tiny.style.top, 10)
        const tinyX = parseInt(tiny.style.left, 10)

        if (tinyY < window.innerHeight + window.scrollY) {
          tiny.style.top = `${tinyY + 1 + Math.random() * 3}px`
          tiny.style.left = `${tinyX + ((i % 5) - 2) / 5}px`
        } else {
          tiny.style.visibility = "hidden"
        }
      }
    })

    animationFrameRef.current = requestAnimationFrame(updateStarsAndTiny)
  }

  const throttle = (
    func: (this: any, ...args: any[]) => void,
    limit: number
  ) => {
    let lastFunc: number | NodeJS.Timeout | undefined
    let lastRan: number
    return function (this: any, ...args: any[]) {
      const context = this
      if (!lastRan) {
        func.apply(context, args)
        lastRan = Date.now()
      } else {
        clearTimeout(lastFunc as number)
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args)
            lastRan = Date.now()
          }
        }, limit - (Date.now() - lastRan))
      }
    }
  }

  const handleMouseMove = throttle((e: { pageX: any; pageY: any }) => {
    const mouseX = e.pageX
    const mouseY = e.pageY

    starsRef.current.some((star, i) => {
      if (star && star.style.visibility === "hidden") {
        star.style.left = `${mouseX}px`
        star.style.top = `${mouseY}px`
        star.style.backgroundColor = newColour()
        star.style.clipPath = "rect(0px, 5px, 5px, 0px)"
        star.style.visibility = "visible"
        return true // Break the loop
      }
      return false // Continue the loop
    })
  }, 100) // 100ms 간격으로 함수 실행 제한

  useEffect(() => {
    createStarElements()
    updateStarsAndTiny()

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      document.removeEventListener("mousemove", handleMouseMove)
      starsRef.current.forEach(
        (star) => star && document.body.removeChild(star)
      )
      tinyRef.current.forEach((tiny) => tiny && document.body.removeChild(tiny))
    }
  }, [])

  return null
}

export default Sparkle
