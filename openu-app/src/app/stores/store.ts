import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import CommentStore from "./commentStore";
import VacationStore from "./vacationStore";

interface Store{
    activityStore : ActivityStore
    commonStore : CommonStore;
    userStore : UserStore;
    modalStore : ModalStore;
    profileStore : ProfileStore
    commentStore: CommentStore
    vacationStore : VacationStore
}

export const store: Store = {
    activityStore : new ActivityStore(),
    commonStore : new CommonStore(),
    userStore : new UserStore(),
    modalStore : new ModalStore(),
    profileStore : new ProfileStore(),
    commentStore: new CommentStore(),
    vacationStore: new VacationStore()
}

export const StoreContext = createContext(store);

export function useStore()
{
    return useContext(StoreContext);
}