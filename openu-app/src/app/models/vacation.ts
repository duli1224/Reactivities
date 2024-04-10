import { Activity } from "./activity";
import { Profile } from "./profile";

export interface IVacation {
    id: string;
    title: string;
    startDate: Date | null;
    endDate: Date | null;
    description: string;
    category: string;
    location: string;
    hostUserName?: string;
    isHost: boolean;
    host?: Profile;
    activities : Activity[];
}

export class Vacation implements Vacation {
    constructor(init: VacationFormValues) {
        this.id = init.id!
        this.startDate = init.startDate
        this.endDate = init.endDate
        this.description = init.description
        this.category = init.category
        this.title = init.title
        this.location = init.location;
        this.activities = init.activities;
    }

    id: string;
    title: string;
    startDate: Date | null;
    endDate: Date | null;
    description: string;
    category: string;
    location: string;
    hostUserName: string = '';
    host?: Profile;
    isHost: boolean = false;
    activities : Activity[] = [];

}

export class VacationFormValues {
    id?: string = undefined;
    title: string = '';
    description: string = '';
    category: string = '';
    location: string = '';
    startDate: Date | null = null;
    endDate: Date | null = null;
    activities : Activity[] = [];

    constructor(Vacation?: VacationFormValues) {

        if (Vacation) {
            this.id = Vacation.id;
            this.title = Vacation.title;
            this.description = Vacation.description;
            this.category = Vacation.category;
            this.location = Vacation.location;
            this.startDate = Vacation.startDate;
            this.endDate = Vacation.endDate;
            this.activities = Vacation.activities;
        }
    }
}