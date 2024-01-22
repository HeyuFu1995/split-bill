import { useState } from "react";
import initialFriends from "../data/friends";
import FriendsList from "./FriendList";
import FormAddFriend from "./FormAddFriend";
import FormSplitBill from "./FormSplitBill";
import Button from "./Button";


function App() {

  const [showAddFriend, setShowAddFriend] = useState(false);

  const [friends, setFriends] = useState(initialFriends);

  const [selected, setSelected] = useState(null);

  function changeAddFormStatus() {
    setShowAddFriend(p => !p);
  }

  function addFriend(newFriend) {
    setFriends((p) => [...p, newFriend]);
    setShowAddFriend(false);
  }

  function selectFriend(id) {
    const findFriend = friends.find((f) => f.id === id);
    setSelected((p) => p?.id === id ? null : findFriend);
  }

  function handleSplitBill(value) {
    setFriends(friends => friends.map(
      friend => friend.id === selected.id ? { ...friend, balance: friend.balance + value } : friend
    ));

    selectFriend(null);
  }

  return (<div className="app">
    <div className="sidebar">
      <FriendsList friends={friends} selectFriend={selected} select={selectFriend} />
      {showAddFriend && <FormAddFriend addFriend={addFriend} />}
      <Button onclick={changeAddFormStatus}>{showAddFriend ? "CLose" : "Add Friend"}</Button>
    </div>
    <FormSplitBill key={selected.id} selectFriend={selected} onSplitBill={handleSplitBill} />
  </div>);
}
export default App;
