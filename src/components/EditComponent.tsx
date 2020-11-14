import axios from 'axios';
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { nameofFactory } from "../infrastructure/nameof";
import { UserListDto, userListQueryId, usersUrl, useUserQuery } from "./query";
import { useQueryCache } from "react-query";


const nameof = nameofFactory<UserListDto>();

export const EditComponent = (props: {
  userId: number;
  onEditFinished: () => void;
}) => {
  const userInfo = useUserQuery(props.userId);
  const queryCache = useQueryCache();
  const form = useForm<UserListDto>();
  useEffect(()=>{
    if (userInfo.data) {
      form.reset(userInfo.data);
    }
  }, [userInfo.data])
  const submitHandler = async (data: UserListDto) => {
    await axios.patch(usersUrl + '/' + props.userId, data, undefined);
    console.log('qq');
    await queryCache.invalidateQueries(userListQueryId);
    props.onEditFinished();
  }
  return <form onSubmit={form.handleSubmit(submitHandler)}>
    <div><input name={nameof('name')} ref={form.register}/></div>
    <div>
      <button type="submit" title={"OK"}>OK</button>
    </div>

  </form>
}
