import Friend from "./Friend";

function FriendsList({ friends, select, selectFriend }) {
    return (<ul>{friends.map((friend) => <Friend selectFriend={selectFriend} select={select} friend={friend} key={friend.id} />)}</ul>);
}

export default FriendsList;