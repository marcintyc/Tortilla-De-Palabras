import React, { useState, useEffect } from 'react';
import { users as usersData } from '../../../data/users';
import UsersListItem from '../../molecules/UserListItem/UserListItem';
import { Wrapper } from './UserList.styles';

const mockAPI = (success) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (usersData) {
        resolve([...usersData]);
      } else {
        reject({ message: 'Error' });
      }
    }, 2000);
  });
};

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoadingState] = useState([]);
  
  useEffect(() => {
    setLoadingState(true);
    mockAPI()
      .then((data) => {
        setLoadingState(false);
        setUsers(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() =>{
console.log("something was changed")
  }, [isLoading])

  const deleteUser = (name) => {
    const filteredUsers = users.filter((user) => user.name !== name);
    setUsers(filteredUsers);
  };


	return (
		<Wrapper>
			<h1>{isLoading ? 'Loading...' : `User's list:`}</h1>
			{/* <StyledList>  */}
      
			{users.map(userData => (
				<UsersListItem
					deleteUser={deleteUser}
					key={userData.name}
					userData={userData}
				/>
			))}
      
			{/* </StyledList>  */}
		</Wrapper>
	);
};

export default UsersList;
