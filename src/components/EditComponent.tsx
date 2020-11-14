import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { nameofFactory } from "../infrastructure/nameof";
import { UserListDto, userListQueryId, userQueryId, usersUrl, useUserQuery } from "./query";
import { useQueryClient } from "react-query";


const nameof = nameofFactory<UserListDto>();

export const EditComponent = (props: {
  userId: number;
  onEditFinished: () => void;
}) => {
  const userInfo = useUserQuery(props.userId);
  const queryClient = useQueryClient();
  const form = useForm<UserListDto>();
  useEffect(() => {
    if (userInfo.data) {
      form.reset(userInfo.data);
    }
  }, [userInfo.data]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitHandler = async (data: UserListDto) => {
    setIsSubmitting(true);
    try {
      const d2 = await axios.patch(usersUrl + '/' + props.userId, data, undefined);
      queryClient.setQueryData<UserListDto[]>(userListQueryId, oldData => {
        const oldUser = oldData?.find(x => x.id === props.userId);
        Object.assign(oldUser, data);
        return oldData ?? [];
      });
      queryClient.setQueryData(userQueryId(props.userId), d2.data.data);
      props.onEditFinished();
    } finally {
      setIsSubmitting(false);
    }
  }
  return <form onSubmit={form.handleSubmit(submitHandler)}>
    <div><input name={nameof('name')} ref={form.register}/></div>
    <div>
      <button type="submit" >{isSubmitting ? "Saving..." : "OK"}</button>
    </div>

  </form>
}
