import { Profile } from "./profile";

export interface Activity {
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    city: string;
    venue: string;
    hostUserName?: string;
    attendees?: Profile[];
    host?: Profile;
    isCancelled?: boolean; 
    isHost?: boolean;
    isGoing?: boolean;
  }