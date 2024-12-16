// /src/routes/Feed/index.tsx

import React from "react"
import styled from "@emotion/styled"
import ProfileCard from "src/components/ProfileCard"
import CategorySelect from "src/components/CategorySelect"
import { useRouter } from "next/router"

const Feed: React.FC = () => {
  // Your existing data handling logic
  const tagsData = {} // Your tags data
  const categoriesData = {} // Your categories data

  return (
    <StyledWrapper>
      <div className="feed-container">
        <div className="sidebar">
          <ProfileCard tags={tagsData} />
          <CategorySelect data={categoriesData} />
        </div>
        {/* Your existing feed content */}
      </div>
    </StyledWrapper>
  )
}

export default Feed

const StyledWrapper = styled.div`
  .feed-container {
    display: flex;
    gap: 2rem;
  }

  .sidebar {
    width: 300px;
    flex-shrink: 0;
  }
`
