import { memoryState } from "./memory";

export interface ItemCategorisationState {
    getItemIdBeingCategorisedByCategorisationKey(
        dataset_id: string,
        id: string
    ): Promise<string | undefined>;
    clearItemIdBeingCategorisedByCategorisationKey(
        dataset_id: string,
        id: string
    ): Promise<void>;
    setItemIdBeingCategorisedByCategorisationKey(
        dataset_id: string,
        id: string,
        item_id: string
    ): Promise<void>;
}

export interface ApplicationState {
    itemCategorisation: ItemCategorisationState;
}

// Memory only for now - this is where we can hook in redis later.
export const STATE = memoryState;