import React, {useState, useEffect} from "react"
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import {Ionicons} from '@expo/vector-icons';
import PropTypes from "prop-types";
import { Image, TouchableOpacity, useWindowDimensions } from "react-native";

const Container = styled.View`
`;
const Header = styled.TouchableOpacity`
  padding: 5px;
  flex-direction: row;
  align-items: center;
`;
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
const Username = styled.Text`
  color: white;
  font-weight: 600;
`;
const File = styled.Image``;
const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Action = styled.TouchableOpacity`
  margin-right: 10px;
`;
const Caption = styled.View`
  flex-direction: row;
`;
const CaptionText = styled.Text`
  color: white;
  margin-left: 5px;
`;
const Likes = styled.Text`
  color: white;
  margin: 7px 0px;
  font-weight: 600;
`;
const ExtraContainer = styled.View`
  padding: 10px;
`;

function Photo({id, user, caption, file, isLiked, likes, }) {
  const navigation = useNavigation(); 
  const {width, height} = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(height - 450);
  useEffect(() => {
    Image.getSize(file, (width, height) => {
      setImageHeight(height/3);
    }, (error) => {
      console.log(error);
    })
  }, [file])
  return (
    <Container>
      <Header onPress={() => navigation.navigate("Profile")}>
        <UserAvatar 
          resizeMode="cover"
          source={{uri: user.avatar}}
        />
        <Username>{user.username}</Username>
      </Header>
      <File 
        resizeMode="cover"
        style={{
          width, 
          height: imageHeight,
        }} 
        source={{uri: file}} 
      />
      <ExtraContainer>
        <Actions>
          <Action>
            <Ionicons 
              name={isLiked ? "heart" : "heart-outline"} 
              color={isLiked ? "tomato": "white"} 
              size={20} 
            />
          </Action>
          <Action onPress={() => navigation.navigate("Comments")}>
            <Ionicons name="chatbubble-outline" color="white" size={20} />
          </Action>
        </Actions>
        <TouchableOpacity onPress={() => navigation.navigate("Likes")}>
          <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
        </TouchableOpacity>
        <Caption>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Username>{user.username}</Username>
          </TouchableOpacity>
          <CaptionText>{caption}</CaptionText>
        </Caption>
      </ExtraContainer>
      
    </Container>
  )
}

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string
  }),
  caption: PropTypes.string,
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  commentNumber: PropTypes.number.isRequired
};

export default Photo;