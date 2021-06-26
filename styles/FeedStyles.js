import styled from 'styled-components';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    background-color: #fff;
    padding: 20px;
`

export const Card = styled.View`
    background-color: #f8f8f8;
    width: 100%;
    margin-bottom: 20px;
    border-radius: 7px;
    border: 0.1px solid #000;
    padding: 10px;
`

export const UserInfo = styled.View`
    flex-direction: row;
    justify-content: flex-start;
`

export const UserImg = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`
export const UserInfoText = styled.View`
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
`

export const UserName = styled.Text`
    font-size: 14px;
    font-weight: bold;
`

export const PostTime = styled.Text`
    font-size: 12px;
    color: #666;
`

export const PostText = styled.Text`
    font-size: 14px;
    padding: 10px;
`

export const PostImg = styled.Image`
    width: 100%;
    height: 200px;
    margin-top: 15px;
    border-radius: 7px;
    border: 0.2px solid #333;
`

export const Divider = styled.View`
    border-bottom-color: #ddd;
    border-bottom-width: 1px;
    width: 94%;
    align-self: center;
    margin-top: 10px;
`

export const InteractionWrapper = styled.View`
    flex-direction: row;
    justify-content: space-around;
    padding: 15px 10px 1px 10px;
`

export const Interaction = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    border-radius: 5px;
    padding: 2px 5px;
    background-color: ${props => props.active ? '#2e64e515' : 'transparent'}
`

export const InteractionText = styled.Text`
    font-size: 12px;
    font-weight: bold;
    color: ${props => props.active ? '#FF3F7A' : '#333'};
    margin-top: 5px;
    margin-left: 5px;
`