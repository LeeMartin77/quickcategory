import { randomUUID } from "crypto";
import { ApplicationState } from ".";
import { memoryState } from "./memory";

const stateManagers: [string, ApplicationState][] = [["memory", memoryState]];

describe.each(stateManagers)("itemCategorisation %s state manager", (_: string, state: ApplicationState) => {
    test("Empty read, insert, read, read, read, insert, newread, newread, clear, emptyread", async ()=>{
        const test_dataset_id = randomUUID();
        const test_id = randomUUID();
        expect(await state.itemCategorisation
            .getItemIdBeingCategorisedByCategorisationKey(
                test_dataset_id, test_id
            )).toBeUndefined();
        const test_item_id = randomUUID();
        expect(state.itemCategorisation
            .setItemIdBeingCategorisedByCategorisationKey(
                test_dataset_id, test_id, test_item_id
            )).resolves;
        
        expect(await state.itemCategorisation
            .getItemIdBeingCategorisedByCategorisationKey(
                test_dataset_id, test_id
            )).toBe(test_item_id);
        expect(await state.itemCategorisation
            .getItemIdBeingCategorisedByCategorisationKey(
                test_dataset_id, test_id
            )).toBe(test_item_id);
        expect(await state.itemCategorisation
            .getItemIdBeingCategorisedByCategorisationKey(
                test_dataset_id, test_id
            )).toBe(test_item_id);

        const second_item_id = randomUUID();
        expect(state.itemCategorisation
            .setItemIdBeingCategorisedByCategorisationKey(
                test_dataset_id, test_id, second_item_id
            )).resolves;
        expect(await state.itemCategorisation
            .getItemIdBeingCategorisedByCategorisationKey(
                test_dataset_id, test_id
            )).toBe(second_item_id);
        expect(await state.itemCategorisation
            .getItemIdBeingCategorisedByCategorisationKey(
                test_dataset_id, test_id
            )).toBe(second_item_id);
            
        expect(state.itemCategorisation
            .clearItemIdBeingCategorisedByCategorisationKey(
                test_dataset_id, test_id
            )).resolves;
        expect(await state.itemCategorisation
            .getItemIdBeingCategorisedByCategorisationKey(
                test_dataset_id, test_id
            )).toBeUndefined();
        expect(state.itemCategorisation
            .clearItemIdBeingCategorisedByCategorisationKey(
                test_dataset_id, test_id
            )).resolves;
    });
});