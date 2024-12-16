// ProfileCard.tsx
import { CONFIG } from "site.config"
import { Emoji } from "src/components/Emoji"
import Image from "next/image"
import React from "react"
import styled from "@emotion/styled"
import TagList from "./TagList"  // Import TagList component

type Props = {
  tags?: Record<string, number>
}

const ProfileCard: React.FC<Props> = ({ tags }) => {
  return (
    <StyledWrapper>
      <div className="title">
        <Emoji>ð»</Emoji> Profile
      </div>
      <div className="content">
        <div className="top">
          <Image src={CONFIG.profile.image} fill alt="" />
        </div>
        <div className="mid">
          <div className="name">{CONFIG.profile.name}</div>
          <div className="description">{CONFIG.profile.description}</div>
        </div>
        {tags && <TagList data={tags} />}
      </div>
    </StyledWrapper>
  )
}

export default ProfileCard

const StyledWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 0.5rem;
  box-shadow: ${(props) => props.theme.shadows.sm};

  .title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .content {
    .top {
      position: relative;
      width: 100%;
      padding-bottom: 100%;
      margin-bottom: 1rem;

      img {
        object-fit: cover;
        border-radius: 50%;
      }
    }

    .mid {
      text-align: center;

      .name {
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      .description {
        font-size: 0.9rem;
        color: ${(props) => props.theme.colors.gray};
      }
    }
  }
`
