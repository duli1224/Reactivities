import { Profile } from "./profile";

export interface IActivity {
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    city: string;
    venue: string;
    hostUserName?: string;
    attendees: Profile[];
    host?: Profile;
    isCancelled?: boolean; 
    isHost: boolean;
    isGoing: boolean;
    vacationId : string;
  }
  export class Activity implements Activity {
    constructor (init: ActivityFormValues){
      this.id = init.id!
      this.category = init.category
      this.city = init.city
      this.date = init.date
      this.description = init.description
      this.venue = init.venue
      this.title = init.title
      this.vacationId = init.vacationId
    }

    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    city: string;
    venue: string;
    hostUserName: string = '';
    attendees?: Profile[];
    host?: Profile ;
    isCancelled: boolean = false; 
    isHost: boolean = false;
    isGoing: boolean = false;
    vacationId: String;
  }

  export class ActivityFormValues {
    id?: string = undefined;
    title: string = '';
    category: string = '';
    description: string = '';
    date: Date | null = null;
    city: string = '';
    venue: string = '';
    vacationId: String= '';

    constructor(activity?: ActivityFormValues){
     if (activity) 
     {
        this.id = activity.id;
        this.title = activity.title;
        this.category = activity.category;
        this.city = activity.city;
        this.description = activity.description;
        this.venue = activity.venue;
        this.date = activity.date;
        this.vacationId = activity.vacationId;
     } 
    }
  }