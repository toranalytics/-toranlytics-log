// CategorySelect.tsx
import React, { useRef, useState } from "react"
import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { DEFAULT_CATEGORY } from "src/constants"

type Props = {
  data: Record<string, number>
}

const CategorySelect: React.FC<Props> = ({ data }) => {
  const router = useRouter()
  const [opened, setOpened] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY

  const handleOpen = () => {
    setOpened(!opened)
  }

  const handleOptionClick = (category: string) => {
    router.push({
      query: {
        ...router.query,
        category,
      },
    })
    setOpened(false)
  }

  return (
    <StyledWrapper>
      <div ref={dropdownRef} className="wrapper" onClick={handleOpen}>
        <div className="current">
          {`${currentCategory} (${data[currentCategory] || 0})`}
        </div>
        
        {opened && (
          <div className="content">
            {Object.keys(data).map((key, idx) => (
              <div
                className="item"
                key={idx}
                onClick={() => handleOptionClick(key)}
              >
                {`${key} (${data[key]})`}
              </div>
            ))}
          </div>
        )}
      </div>
    </StyledWrapper>
  )
}

export default CategorySelect

const StyledWrapper = styled.div`
  .wrapper {
    position: relative;
    cursor: pointer;
  }

  .current {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background-color: ${(props) => props.theme.colors.gray};
  }

  .content {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    margin-top: 0.5rem;
    background-color: ${(props) => props.theme.colors.white};
    border-radius: 0.5rem;
    box-shadow: ${(props) => props.theme.shadows.md};
    z-index: 10;

    .item {
      padding: 0.5rem 1rem;
      
      &:hover {
        background-color: ${(props) => props.theme.colors.gray};
      }
    }
  }
`
