import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

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
    <FormSplitBill selectFriend={selected} onSplitBill={handleSplitBill} />
  </div>);
}

function FriendsList({ friends, select, selectFriend }) {
  return (<ul>{friends.map((friend) => <Friend selectFriend={selectFriend} select={select} friend={friend} key={friend.id} />)}</ul>);
}

function Friend({ friend, select, selectFriend }) {
  const isSelected = selectFriend?.id === friend.id;
  return <li className={isSelected ? "selected" : ""} onClick={() => select(friend.id)}>
    <img src={friend.image} alt={friend.name} />
    <h3>{friend.name}</h3>
    {friend.balance < 0 && (<p className="red">You owe {friend.name} {Math.abs(friend.balance)}$</p>)}
    {friend.balance > 0 && (<p className="green">{friend.name} owe you {Math.abs(friend.balance)}$</p>)}
    {friend.balance === 0 && (<p>You and {friend.name} are even</p>)}
    <Button>{isSelected ? "Close" : "Select"}</Button>
  </li>
}

function FormAddFriend({ addFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;

    const id = crypto.randomUUID();

    const newFriend = {
      name,
      image: `${image}?u=${id}`,
      balance: 0,
      id,
    }

    addFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return <form className="form-add-friend" onSubmit={handleSubmit}>
    <label>🧑‍🤝‍🧑Friend name</label>
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

    <label>🖼️Image URL</label>
    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />

    <Button>Add</Button>
  </form>
}

function FormSplitBill({ selectFriend, onSplitBill }) {
  const [bill, setBill] = useState(0);
  const [paidByUser, setPaidByUser] = useState(0);
  const paidByFriend = bill - paidByUser;
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  if (!selectFriend) return;

  function handleSubmit(e) {
    e.preventDefault();

    if (bill === 0) return;

    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
    setBill(0);
    setPaidByUser(0);
    setWhoIsPaying("user");
  }

  const { name } = selectFriend;
  return <form className="form-split-bill" onSubmit={handleSubmit}>
    <h2>Split a bill with {name}</h2>

    <label>💰 Bill value</label>
    <input type="text" value={bill} onChange={(e) => setBill(e.target.value)} />

    <label>🤵 Your expense</label>
    <input type="text" value={paidByUser} onChange={(e) => {
      const newVal = Number(e.target.value);
      setPaidByUser(newVal > bill ? paidByUser : newVal);
    }} />

    <label>🧑‍🤝‍🧑 {name}'s expense</label>
    <input type="text" value={paidByFriend} disabled />

    <label>🤑 Who is paying the bill</label>
    <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
      <option value="user">You</option>
      <option value="friend">{name}</option>
    </select>

    <Button>Split bill</Button>
  </form>
}


function Button({ children, onclick }) {
  return <button onClick={onclick} className="button">{children}</button>
}

export default App;
