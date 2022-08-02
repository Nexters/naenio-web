import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

interface Choice {
  sequence: number,
  name: string,
}

interface Post {
  voteCount: number,
  member: {
    iconKey: number,
    name: string,
  },
  post: {
    title: string,
    content: string,
  },
  choices: Array<Choice>,
  commentCount: number,
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

const MemberName = styled.p`
  color: #ffffff;
  font-size: 16px;
  line-height: 31px;
`;

const VoteInfo = styled.p`
  margin-top: 24px;
  color: #ffffff;
  font-size: 14px;
  line-height: 22px;
`;

const PostTitle = styled.p`
  margin-top: 4px;
  color: #ffffff;
  font-size: 22px;
  line-height: 31px;
`;

const PostContent = styled.p`
  margin-top: 10px;
  color: #ffffff;
  font-size: 16px;
  line-height: 22px;
`;

const ChoicesContainer = styled.div`
  position: relative;
  width: 100%;
  height: 162px;
  border-radius: 16px;
  margin-top: 128px;
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

const ChoiceName = styled.p`
  font-size: 16px;
  line-height: 22px;
  color: #ffffff;
  margin: 14px;
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
  width: 100%;
  height: 46px;
  background: #000000;
  border-radius: 12px;
  margin-top: 32px;
  align-items: center;
`;

const CommentTitle = styled.p`
  font-size: 16px;
  line-height: 22px;
  color: #ffffff;
  margin-left: 14px;
`;

const CommentCount = styled.p`
  font-size: 16px;
  line-height: 17px;
  color: #ffffff;
  margin: 6px;
`;


const PostDetailPage: React.FC = () => {
  const { postId } = useParams<string>();
  const [post, setPost] = useState<Post>({
    choices: [{ sequence: 0, name: "" }, { sequence: 1, name: "" }],
    commentCount: 0,
    member: { iconKey: 0, name: "" },
    post: { content: "", title: "" },
    voteCount: 0
  });


  useEffect(() => {
    const fetchPost = async () => {
      // return await axios.get("");

      return {
        voteCount: 312,
        member: {
          iconKey: 1,
          name: "김만두",
        },
        post: {
          title: "세상에 모든 사람이 날 알아보기 투명 인간 취급 당하기?",
          content: "세상 모든 사람들이 날 알아보지 못하면 슬플 것 같아요."
        },
        choices: [
          {
            sequence: 0,
            name: "A. 세상 모든 사람이 날 알아보기정말",
          },
          {
            sequence: 1,
            name: "B. 투명 인간 취급당하며 힘들게 살기"
          }
        ],
        commentCount: 300
      };
    }

    fetchPost()
      .then(it => setPost(it));
  }, [])

  return (
    <Container>
      <TitleContainer>
        <MemberName>김만두</MemberName>
        <VoteInfo>{post.voteCount}명 투표</VoteInfo>
        <PostTitle>{post.post.title}</PostTitle>
        <PostContent>{post.post.content}</PostContent>
        <ChoicesContainer>
          <FirstChoiceContainer>
            <ChoiceName>{post.choices[0].name}</ChoiceName>
          </FirstChoiceContainer>
          <VersusMarkContainer>
            <VersusMark>vs</VersusMark>
          </VersusMarkContainer>
          <SecondChoiceContainer>
            <ChoiceName>{post.choices[1].name}</ChoiceName>
          </SecondChoiceContainer>
        </ChoicesContainer>
        <CommentContainer>
          <CommentTitle>댓글</CommentTitle>
          <CommentCount>{post.commentCount}개</CommentCount>
        </CommentContainer>
      </TitleContainer>
    </Container>
  );
}

export default PostDetailPage;