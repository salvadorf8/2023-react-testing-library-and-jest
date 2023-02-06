import { useState } from 'react';
import UserForm from './components/userForm';
import UserList from './components/userList';

const App = () => {
    const [users, setUsers] = useState([]);

    const onUserAdd = (user) => {
        setUsers([...users, user]);
    };

    return (
        <div>
            <UserForm onUserAdd={onUserAdd} />
            <hr />
            <UserList users={users} />
        </div>
    );
};

export default App;
