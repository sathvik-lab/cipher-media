import React, { useEffect, useState } from 'react';

function HistoryList() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        // Fetch history from Firestore
        const db = firebase.firestore();
        db.collection('history').get().then((snapshot) => {
            const historyData = snapshot.docs.map((doc) => doc.data());
            setHistory(historyData);
        });
    }, []);

    return (
        <div>
            <h2>History</h2>
            <ul>
                {history.map((item) => (
                    <li key={item.id}>
                        <p>{item.message}</p>
                        <img src={item.imageUrl} alt="Uploaded" />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HistoryList;