import { configs } from "./_testConfigs";
import { isValidationError } from "./types/StorageErrors";
import { StoreDataset, UpdateDataset } from "./types/Dataset";
import { randomUUID } from "crypto";

describe.each(configs)(
    "$name DatasetAdminKey Non-Integration Storage Tests",
    ({ config }) => {
        const badCreates = [
            [{
                name: randomUUID(), 
                item_type_keys: [
                    {
                        index: 0,
                        value: randomUUID()
                    }
                ], item_labels: []
            },
            {
                name: randomUUID(), 
                item_type_keys: [
                ], item_labels: []
            },
            {
                name: randomUUID(), 
                item_type_keys:[], 
                item_labels:  [
                    {
                        index: 0,
                        value: randomUUID()
                    }
                ]
            },
            {
                name: randomUUID(),
                item_labels: [
                    { index: 0, value: randomUUID() },
                    { index: 0, value: randomUUID() },
                ],
                item_type_keys: [
                    { index: 0, value: randomUUID() },
                    { index: 0, value: randomUUID() },
                ],
            }]
        ];

        test.each(badCreates)("Rejects bad datasets", async (bad) => {
            const res = await config.storage.dataset
                .storeDataset(bad as Parameters<StoreDataset>[0]);
            expect(res.isErr()).toBeTruthy();
            expect(isValidationError(res._unsafeUnwrapErr())).toBeTruthy();
        });

        const badUpdates = [
            [
                {
                    name: randomUUID(), 
                    item_type_keys: [
                        {
                            index: 0,
                            value: randomUUID()
                        }
                    ], item_labels: []
                },
                {
                    name: randomUUID(), 
                    item_type_keys: [],
                    item_labels: []
                },
                {
                    name: randomUUID(), 
                    item_type_keys:[], 
                    item_labels:  [
                        {
                            index: 0,
                            value: randomUUID()
                        }
                    ]
                },
                {
                    item_type_keys: [],
                    item_labels: []
                },
                {
                    item_labels: []
                },
                {
                    item_labels: [
                        { index: 0, value: randomUUID() },
                        { index: 0, value: randomUUID() },
                    ],
                    item_type_keys: [
                        { index: 0, value: randomUUID() },
                        { index: 0, value: randomUUID() },
                    ],
                },
                {
                    item_labels: [
                        { index: 0, value: randomUUID() },
                        { index: 0, value: randomUUID() },
                    ]
                },
                {
                    item_type_keys: [
                        { index: 0, value: randomUUID() },
                        { index: 0, value: randomUUID() },
                    ],
                },
            ]
        ];

        test.each(badUpdates)("Rejects bad dataset updates", async (bad) => {
            const res = await config.storage.dataset
                .updateDataset(
                    randomUUID(), 
                    bad as Parameters<UpdateDataset>[1]
                );
            expect(res.isErr()).toBeTruthy();
            expect(isValidationError(res._unsafeUnwrapErr())).toBeTruthy();
        });
    });