import React, { useState, useEffect, useRef, ReactNode } from "react"
import { ThemeProvider } from "./ThemeProvider"
import useScheme from "src/hooks/useScheme"
import Header from "./Header"
import styled from "@emotion/styled"
import Scripts from "src/layouts/RootLayout/Scripts"
import useGtagEffect from "./useGtagEffect"
import useThrottle from "src/hooks/useThrottle"
import { useRouter } from "next/router"

type Props = {
  children: ReactNode
}

const RootLayout = ({ children }: Props) => {
  const router = useRouter()
  const currentElementRef = useRef<HTMLDivElement | null>(null)

  const [blogHeight, setBlogHeight] = useState(0)
  const [throttleScrollY, setThrottleScrollY] = useState<number>(0)
  const [scheme] = useScheme()
  console.log(throttleScrollY)
  useGtagEffect()

  const scrollThrottle = useThrottle(() => {
    setThrottleScrollY(window.scrollY)
  }, 100)

  const getCurrentPercentage = () => {
    if (router.asPath === "/") return 0

    const scrollPosition = window.scrollY + window.innerHeight
    const totalHeight = document.documentElement.scrollHeight
    let percentage = Math.ceil((scrollPosition / totalHeight) * 100)

    percentage = percentage >= 90 ? 100 : percentage

    return percentage
  }

  useEffect(() => {
    const updateBlogHeight = () => {
      const totalHeight = document.documentElement.scrollHeight
      setBlogHeight(totalHeight - window.innerHeight)
    }

    updateBlogHeight()

    window.addEventListener("resize", updateBlogHeight)
    window.addEventListener("scroll", scrollThrottle)

    return () => {
      window.removeEventListener("scroll", scrollThrottle)
      window.removeEventListener("resize", updateBlogHeight)
    }
  }, [scrollThrottle])

  return (
    <ThemeProvider scheme={scheme}>
      <Scripts />
      {/* // TODO: replace react query */}
      {/* {metaConfig.type !== "Paper" && <Header />} */}
      <Header
        fullWidth={false}
        readingProgress={blogHeight < 1200 ? 0 : getCurrentPercentage()}
      />
      <StyledMain ref={currentElementRef}>{children}</StyledMain>
    </ThemeProvider>
  )
}

export default RootLayout

const StyledMain = styled.main`
  margin: 0 auto;
  width: 100%;
  max-width: 1120px;
  padding: 0 1rem;
`
