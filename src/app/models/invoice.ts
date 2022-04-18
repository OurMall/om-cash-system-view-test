import { Details } from "./details";

export interface Invoice {
    id_client:String;
    details: Details[];
}