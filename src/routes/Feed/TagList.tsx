// TagList.tsx
import React from "react"
import styled from "@emotion/styled"
import { useRouter } from "next/router"

type Props = {
  data: Record<string, number>
}

const TagList: React.FC<Props> = ({ data }) => {
  const router = useRouter()
  const currentTag = `${router.query.tag || ``}` || undefined

  const handleClickTag = (tag: string) => {
    router.push({
      query: {
        ...router.query,
        tag: tag === currentTag ? "" : tag,
      },
    })
  }

  return (
    <StyledWrapper>
      <div className="tag-container">
        {Object.keys(data).map((key) => (
          <a
            key={key}
            className="tag-item"
            data-active={key === currentTag}
            onClick={() => handleClickTag(key)}
          >
            {key}
          </a>
        ))}
      </div>
    </StyledWrapper>
  )
}

export default TagList

const StyledWrapper = styled.div`
  .tag-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1rem;
    padding: 1rem;
  }

  .tag-item {
    font-size: 0.9rem;
    padding: 0.2rem 0.5rem;
    border-radius: 0.25rem;
    background-color: ${(props) => props.theme.colors.gray};
    cursor: pointer;
    
    &[data-active="true"] {
      background-color: ${(props) => props.theme.colors.primary};
      color: white;
    }
  }
`
