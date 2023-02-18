import { randomUUID } from "crypto";
import { DatasetItem } from "../../../storage/types/DatasetItem";
import { GqlDatasetItem, storageItemsToGqlItems, storageItemToGqlItem } from "./gqlDatasetItemFromStorage";

describe("storageItemsToGqlItems", () => {
    test("Converts empty to empty", () => {
        const storageItems: DatasetItem[] = [];
        const expected: GqlDatasetItem[] = [];
        expect(storageItemsToGqlItems(storageItems)).toEqual(expected);
    });
    test("Converts Array", () => {
        const dataset_id = randomUUID();
        const id = randomUUID();
        const storageItems: DatasetItem[] = [{
            dataset_id,
            id,
            values: [
                { index: 4, value: "last"},
                { index: 0, value: "first"},
                { index: 1, value: "mid"}
            ]
        }];
        const expected: GqlDatasetItem[] = [{
            dataset_id,
            id,
            value: [
                "first",
                "mid",
                "last",
            ],
        }];
        expect(storageItemsToGqlItems(storageItems)).toEqual(expected);
    });
    test("Converts Single", () => {
        const dataset_id = randomUUID();
        const id = randomUUID();
        const storageItem: DatasetItem = {
            dataset_id,
            id,
            values: [
                { index: 4, value: "last"},
                { index: 0, value: "first"},
                { index: 1, value: "mid"}
            ]
        };
        const expected: GqlDatasetItem = {
            dataset_id,
            id,
            value: [
                "first",
                "mid",
                "last",
            ],
        };
        expect(storageItemToGqlItem(storageItem)).toEqual(expected);
    });
});