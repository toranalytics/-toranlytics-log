// FeedHeader.tsx
import React from "react"
import { CategorySelect } from "./CategorySelect"
import { OrderButtons } from "./OrderButtons"
import { StyledWrapper } from "./styles"

const FeedHeader: React.FC = () => {
  // Add categories data
  const categoriesData: Record<string, number> = {
    // Add your category data here
    // Example:
    // "category1": 10,
    // "category2": 20,
  }

  return (
    <StyledWrapper>
      <CategorySelect data={categoriesData} />
      <OrderButtons />
    </StyledWrapper>
  )
}

export default FeedHeader
