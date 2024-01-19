import { useState } from "react";
import Button from "./Button";

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

export default FormSplitBill;