import React from "react";
import { useUsersQuery } from "./query";

export const ListComponent = (props: {
  onUserSelected: (userId: number) => void;
  useSuspense: boolean;
}) => {
  const users = useUsersQuery({
    suspense: props.useSuspense,
  });

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
