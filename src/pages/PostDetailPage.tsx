import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProfileImageSrc0 from "../images/profile_image_0.png";
import ProfileImageSrc1 from "../images/profile_image_1.png";
import ProfileImageSrc2 from "../images/profile_image_2.png";
import ProfileImageSrc3 from "../images/profile_image_3.png";
import ProfileImageSrc4 from "../images/profile_image_4.png";
import ProfileImageSrc5 from "../images/profile_image_5.png";
import ProfileImageSrc6 from "../images/profile_image_6.png";
import ProfileImageSrc7 from "../images/profile_image_7.png";
import ProfileImageSrc8 from "../images/profile_image_8.png";
import VoteBoxSrc from "../images/vote_box.png";
import BubbleSrc from "../images/bubble.png";
import axios from "axios";

interface Post {
  id: number,
  author: Author,
  title: string,
  content: string,
  choices: Array<Choice>,
  commentCount: number,
  totalVoteCount: number,
}

interface Author {
  id: number,
  nickname: string | null,
  profileImageIndex: number | null,
}

interface Choice {
  id: number,
  sequence: number,
  name: string,
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #191A1F;
  display: flex;
  justify-content: center;
`;

const TitleContainer = styled.div`
  max-width: 400px;
  width: 100%;
  max-height: 197px;
  margin: 30px 40px;
`;

const ProfileImage = styled.img`
  position: relative;
  top: 5.5px;
  width: 24px;
  height: 24px;
`;

const MemberName = styled.span`
  display: inline-block;
  font-style: normal;
  font-weight: 500;
  font-family: "Pretendard-Medium", system-ui;
  color: #ffffff;
  font-size: 16px;
  line-height: 31px;
  margin-left: 6px;
`;

const VoteBox = styled.img`
  position: relative;
  top: 5px;
  width: 20px;
  height: 22px;
`;

const VoteInfo = styled.span`
  display: inline-block;
  font-family: "Pretendard-Medium", system-ui;
  font-style: normal;
  font-weight: 500;
  margin-top: 24px;
  color: #ffffff;
  font-size: 14px;
  line-height: 22px;
  margin-left: 3px;
`;

const PostTitle = styled.p`
  font-family: "Pretendard-SemiBold", system-ui;
  font-style: normal;
  font-weight: 600;
  margin-top: 4px;
  color: #ffffff;
  font-size: 20px;
  line-height: 29px;
`;

const PostContent = styled.p`
  font-family: "Pretendard-Medium", system-ui;
  font-style: normal;
  font-weight: 500;
  margin-top: 10px;
  color: #ffffff;
  font-size: 14px;
  line-height: 21px;
`;

interface NeedLoginContainerProps {
  active: boolean;
}

const NeedLoginContainer = styled.div<NeedLoginContainerProps>`
  margin-top: 128px;
  position: relative;
  width: 100%;
  height: 240px;
  border-radius: 16px;
  transition: all 1s;
  background: rgb(0, 0, 0, ${props => props.active ? 0.8 : 0});
  backdrop-filter: blur(4px) opacity(${props => props.active ? 1 : 0});
  transition-property: background, backdrop-filter;
  z-index: 2;
`

const ChoicesContainer = styled.div`
  position: relative;
  top: -240px;
  width: 100%;
  height: 162px;
  border-radius: 16px;
  align-items: center;
`;

const FirstChoiceContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 72px;
  background: #000000;
  border-radius: 16px;
  align-items: center;
`;

const ChoiceIndex = styled.p`
  font-family: "Montserrat-Bold", system-ui;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  line-height: 22px;
  margin-left: 14px;
`;

const ChoiceName = styled.p`
  font-family: "Pretendard-SemiBold", system-ui;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  color: #ffffff;
  margin: 14px 6px;
`;

const VersusMarkContainer = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  width: 34px;
  height: 34px;
  background: #ffffff;
  z-index: 1;
  align-items: center;
  justify-content: center;
`;

const VersusMark = styled.p`
  font-family: "Montserrat-SemiBold", system-ui;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  color: #060606;
`;

const SecondChoiceContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 72px;
  margin-top: 18px;
  background: #000000;
  border-radius: 16px;
  align-items: center;
`;

const CommentContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  top: -240px;
  height: 46px;
  background: #000000;
  border-radius: 16px;
  margin-top: 32px;
  align-items: center;
`;

const Bubble = styled.img`
  position: relative;
  top: 1px;
  width: 19px;
  height: 19px;
  margin-left: 14px;
`;

const CommentTitle = styled.p`
  font-family: "Pretendard-SemiBold", system-ui;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #ffffff;
  margin-left: 4px;
`;

const CommentCount = styled.p`
  font-family: "Pretendard-Regular", system-ui;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
  margin: 6px;
`;

const PostDetailPage: React.FC = () => {
  const { postId } = useParams();
  const [isClick, setIsClick] = useState(false);
  const [post, setPost] = useState<Post>({
    id: 0,
    content: "",
    title: "",
    author: {
      id: 0,
      nickname: null,
      profileImageIndex: null,
    },
    choices: [
      { id: 0, sequence: 0, name: "" },
      { id: 1, sequence: 1, name: "" }
    ],
    commentCount: 0,
    totalVoteCount: 0,
  });

  useEffect(() => {
    const fetchPost = async () => {
      return await axios.get(`https://teamversus.shop/web/posts/${postId}`)
        .then(it => it.data);
    }

    fetchPost()
      .then(it => setPost(it));
  }, [postId])

  const getProfileImageSrc = (profileImageIndex: number) => {
    if (profileImageIndex === 0) {
      return ProfileImageSrc0
    }
    if (profileImageIndex === 1) {
      return ProfileImageSrc1
    }
    if (profileImageIndex === 2) {
      return ProfileImageSrc2
    }
    if (profileImageIndex === 3) {
      return ProfileImageSrc3
    }
    if (profileImageIndex === 4) {
      return ProfileImageSrc4
    }
    if (profileImageIndex === 5) {
      return ProfileImageSrc5
    }
    if (profileImageIndex === 6) {
      return ProfileImageSrc6
    }
    if (profileImageIndex === 7) {
      return ProfileImageSrc7
    }
    if (profileImageIndex === 8) {
      return ProfileImageSrc8
    }
    return undefined;
  }

  return (
    <Container>
      <TitleContainer>
        <div>
          <ProfileImage
            src={getProfileImageSrc(post.author.profileImageIndex === null ? 0 : post.author.profileImageIndex)} />
          <MemberName>{post.author.nickname === null ? "(알 수 없음)" : post.author.nickname}</MemberName>
        </div>
        <VoteBox src={VoteBoxSrc} />
        <VoteInfo>{post.totalVoteCount}명 투표</VoteInfo>
        <PostTitle>{post.title}</PostTitle>
        <PostContent>{post.content}</PostContent>
        <NeedLoginContainer onClick={() => setIsClick(true)}
                            active={isClick} />
        <ChoicesContainer>
          <FirstChoiceContainer>
            <ChoiceIndex>A.</ChoiceIndex>
            <ChoiceName>{post.choices[0].name}</ChoiceName>
          </FirstChoiceContainer>
          <VersusMarkContainer>
            <VersusMark>vs</VersusMark>
          </VersusMarkContainer>
          <SecondChoiceContainer>
            <ChoiceIndex>B.</ChoiceIndex>
            <ChoiceName>{post.choices[1].name}</ChoiceName>
          </SecondChoiceContainer>
        </ChoicesContainer>
        <CommentContainer>
          <Bubble src={BubbleSrc} />
          <CommentTitle>댓글</CommentTitle>
          <CommentCount>{post.commentCount}개</CommentCount>
        </CommentContainer>
      </TitleContainer>
      {/*<a href={`https://naenioapp.page.link/?link=https://${postId}&ibi=com.teamVS.Naenio&isi=363590051`}>딥링크</a>*/}
    </Container>
  );
}

export default PostDetailPage;