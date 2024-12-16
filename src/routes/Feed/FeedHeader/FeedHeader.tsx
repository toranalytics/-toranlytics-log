import React from "react"
import { CategorySelect } from "./CategorySelect"
import { OrderButtons } from "./OrderButtons"
import { StyledWrapper } from "./styles"

const FeedHeader: React.FC = () => {
  const categoriesData: Record<string, number> = {
    "All": 0,
    // Add more categories as needed
  }

  return (
    <StyledWrapper>
      <CategorySelect data={categoriesData} />
      <OrderButtons />
    </StyledWrapper>
  )
}

export default FeedHeader
