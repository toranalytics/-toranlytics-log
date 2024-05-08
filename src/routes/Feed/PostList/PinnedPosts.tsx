import PostCard from "src/routes/Feed/PostList/PostCard"
import React, { useEffect, useState } from "react"
import usePostsQuery from "src/hooks/usePostsQuery"
import styled from "@emotion/styled"

type Props = {
  q: string
}

const PinnedPosts: React.FC<Props> = ({ q }) => {
  const data = usePostsQuery()

  const [filteredPosts, setFilteredPosts] = useState(data)

  useEffect(() => {
    setFilteredPosts(() => {
      let filteredPosts = data
      // keyword
      filteredPosts = filteredPosts.filter((post) => {
        const tagContent = post.tags ? post.tags.join(" ") : ""
        const searchContent = post.title + post.summary + tagContent
        return searchContent.toLowerCase().includes(q.toLowerCase())
      })

      filteredPosts = filteredPosts.filter(
        (post) => post && post.tags && post.tags.includes("Pinned")
      )

      return filteredPosts
    })
  }, [q])

  if (filteredPosts.length === 0) return null

  return (
    <StyledWrapper>
      <div className="wrapper">
        <div className="header">📌 Pinned Posts</div>
      </div>
      <div className="my-2">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} data={post} showMedia={false} />
        ))}
      </div>
    </StyledWrapper>
  )
}

export default PinnedPosts

const StyledWrapper = styled.div`
  position: relative;
  .wrapper {
    display: flex;
    margin-bottom: 1rem;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray6};
  }
  .header {
    display: flex;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    gap: 0.25rem;
    align-items: center;
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 700;
    cursor: pointer;
  }
`
