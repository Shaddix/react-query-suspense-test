import React from "react";
import { useUsersQuery } from "./query";

export const ListComponent = (props: {
  onUserSelected: (userId: number) => void;
}) => {
  const users = useUsersQuery();

  return <div>

    {users.isLoading && <div>loading</div>}
    {users.data && <ul>
      {users.data.map(user => <li>{user.id}: <a href="#" onClick={() => {
        props.onUserSelected(user.id);
        return false;
      }}>{user.name}</a> ({user.email})</li>)}
    </ul>}
  </div>
}
