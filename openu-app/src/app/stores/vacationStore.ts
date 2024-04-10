import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";
import { Vacation, VacationFormValues } from "../models/vacation";
import agent from "../api/agent";
import { Profile } from "../models/profile";

export default class VacationStore {
    vacationRegistry = new Map<string, Vacation>();
    selectedVacation: Vacation | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get vacationsByDate() {
        return Array.from(this.vacationRegistry.values()).sort((a, b) =>
            a.startDate!.getTime() - b.startDate!.getTime());
    }

    get GrupedVacations() {
        return Object.entries(
            this.vacationsByDate.reduce((vacations, vacation) => {
                const date = format(vacation.startDate!, 'dd MMM yyyy');
                vacations[date] = vacations[date] ? [...vacations[date], vacation] : [vacation];
                return vacations;
            }, {} as { [key: string]: Vacation[] })
        )
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    private setVacation = (vacation: Vacation) => {
        const user = store.userStore.user;
        if (user) {
            vacation.startDate = new Date(vacation.startDate!);
            vacation.endDate = new Date(vacation.endDate!);
            vacation.isHost = vacation.hostUserName === user.userName;      
        }
        this.vacationRegistry.set(vacation.id, vacation);
    }

    loadVacations = async () => {
        this.setLoadingInitial(true);
        try {
            const result = await agent.Vacations.list();
            runInAction(() => {
                result.forEach(vacation => {
                    this.setVacation(vacation);
                })
                this.setLoadingInitial(false);
            })
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadVacation = async (id: string) => {
        let vacation = this.getVacation(id);
        if (vacation) {
            this.selectedVacation = vacation;
            return vacation;
        }
        else {
            this.setLoadingInitial(true);
            try {
                vacation = await agent.Vacations.details(id);
                this.setVacation(vacation);
                console.log(vacation.category);
                runInAction(() => this.selectedVacation = vacation);
                this.setLoadingInitial(false);
                return vacation;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getVacation = (id: string) => {
        return this.vacationRegistry.get(id);
    }

    createVacation = async (vacation: VacationFormValues) => {
        const user = store.userStore.user;
        try {
            await agent.Vacations.create(vacation);
            const newVacation = new Vacation(vacation);
            newVacation.hostUserName = user!.userName;
            newVacation.host = new Profile(user!);
            this.setVacation(newVacation);
            runInAction(() => {
                this.selectedVacation = newVacation;
            })
        } catch (error) {
            console.log(error);
        }
    }

    updateVacation = async (vacation: VacationFormValues) => {
        this.loading = true;
        try {
            await agent.Vacations.update(vacation);
            runInAction(() => {
                if (vacation.id) {
                    let updatedVacation = { ...this.getVacation(vacation.id), ...vacation }
                    this.vacationRegistry.set(vacation.id, updatedVacation as Vacation);
                    this.selectedVacation = updatedVacation as Vacation;
                }
            })
        } catch (error) {
            console.log(error);
        } finally {
            this.loading = false;
        }
    }

    deleteVacation = async (id: string) => {
        this.loading = true;
        try {
            await agent.Vacations.delete(id);
            runInAction(() => {
                this.vacationRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    clearSelectedVacation = () => {
        this.selectedVacation = undefined;
    }
}