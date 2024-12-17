import React, { useState, useEffect, useRef, ReactNode } from "react"
import { ThemeProvider } from "./ThemeProvider"
import useScheme from "src/hooks/useScheme"
import Header from "./Header"
import styled from "@emotion/styled"
import Scripts from "src/layouts/RootLayout/Scripts"
import useGtagEffect from "./useGtagEffect"
import useThrottle from "src/hooks/useThrottle"
import { useRouter } from "next/router"
import Category from "src/components/Category" // 카테고리 컴포넌트 임포트

type Props = {
  children: ReactNode
}

const RootLayout = ({ children }: Props) => {
  const router = useRouter()
  const currentElementRef = useRef<HTMLDivElement | null>(null)

  const [blogHeight, setBlogHeight] = useState(0)
  const [throttleScrollY, setThrottleScrollY] = useState<number>(0)
  const [scheme] = useScheme()

  useGtagEffect()

  const scrollThrottle = useThrottle(() => {
    setThrottleScrollY(window.scrollY)
  }, 100)

  const getCurrentPercentage = () => {
    if (window.scrollY === 0 || router.asPath === "/") return 0

    if (!currentElementRef.current) return 0

    const scrollPosition = window.scrollY + window.innerHeight
    const totalHeight = document.documentElement.scrollHeight
    let percentage = (scrollPosition / totalHeight) * 100
    percentage = Math.min(100, Math.max(0, percentage))

    percentage = percentage >= 90 ? 100 : percentage
    return Math.ceil(percentage)
  }

  useEffect(() => {
    const updateBlogHeight = () => {
      const totalHeight = document.documentElement.scrollHeight
      setBlogHeight(window.scrollY === 0 ? 0 : totalHeight - window.innerHeight)
    }

    window.addEventListener("resize", updateBlogHeight)
    window.addEventListener("scroll", scrollThrottle)

    updateBlogHeight()

    return () => {
      window.removeEventListener("scroll", scrollThrottle)
      window.removeEventListener("resize", updateBlogHeight)
    }
  }, [scrollThrottle])

  return (
    <ThemeProvider scheme={scheme}>
      <Scripts />
      <Header
        fullWidth={false}
        readingProgress={blogHeight < 1200 ? 0 : getCurrentPercentage()}
      />
      <LayoutContainer>
        <CategoryWrapper>
          <Category /> {/* 카테고리 컴포넌트 추가 */}
        </CategoryWrapper>
        <StyledMain ref={currentElementRef}>
          {children}
          <TagsWrapper>
            {/* 태그 컴포넌트 또는 태그 내용을 추가 */}
          </TagsWrapper>
        </StyledMain>
      </LayoutContainer>
    </ThemeProvider>
  )
}

export default RootLayout

const LayoutContainer = styled.div`
  display: flex;
  justify-content: space-between; /* 좌우 정렬 */
  align-items: flex-start; /* 상단 정렬 */
  width: 100%;
`

const CategoryWrapper = styled.aside`
  width: 200px; /* 카테고리 영역 너비 */
  /* 추가 스타일 필요 시 여기에 작성 */
`

const StyledMain = styled.main`
  margin: 0 auto;
  width: 100%;
  max-width: 1120px;
  padding: 0 1rem;
  position: relative; /* 태그 위치 조정 시 필요 */
`

const TagsWrapper = styled.div`
  position: absolute; /* 절대 위치로 조정 */
  bottom: 10px; /* 하단 여백 */
  right: 10px; /* 우측 여백 */
  /* 추가 스타일 필요 시 여기에 작성 */
`
