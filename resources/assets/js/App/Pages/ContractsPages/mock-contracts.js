export const data = [
    {
        id: 1,
        number: '000000001',
        weight: 300,
        purchased_weight: 250,
        shipped_weight: 200,
        date_start: '2019-01-11 00:00:00',
        date_end: '2019-11-11 00:00:00',
        pmt: 300,
        expense_amount: 1800,
        purchase_amount: 84000,
        status: 'inactive',
        commodity_id: 2,
        buyer_id: 1,
        created_at: '2020-04-30T14:26:08.000000Z',
        updated_at: '2020-05-04T10:13:30.000000Z',
        deleted_at: null,
        created_by: 1,
        updated_by: 1,
        deleted_by: null,
        buyer: {
            id: 1,
            name: 'First',
            type: 'buyer',
            created_at: null,
            updated_at: null,
            buyer_payments: [{}],
        },
        exporters: [
            {
                id: 3,
                name: 'Third',
                type: 'exporter',
                created_at: null,
                updated_at: null,
                pivot: {
                    contract_id: 1,
                    contractor_id: 3,
                },
            },
        ],
        seller_contracts: [
            {
                id: 2,
                weight: 1000,
                pmt: 20,
                commodity_id: 1,
                seller_id: 2,
                created_at: null,
                updated_at: null,
                deleted_at: null,
                created_by: 1,
                updated_by: null,
                deleted_by: null,
                number: '10000',
                status: 'active',
                pivot: {
                    contract_id: 1,
                    seller_contract_id: 2,
                    weight: 100,
                },
                seller: {
                    id: 2,
                    name: 'Second',
                    type: 'seller',
                    created_at: null,
                    updated_at: null,
                },
            },
        ],
    },
];

// export const data = [
//     {
//         "id": 1,
//         "number": "000000001",
//         "weight": 300,
//         "purchased_weight": 250,
//         "shipped_weight": 200,
//         "date_start": "2019-01-11 00:00:00",
//         "date_end": "2019-11-11 00:00:00",
//         "pmt": 300,
//         "expense_amount": 1800,
//         "purchase_amount": 84000,
//         "status": "inactive",
//         "commodity_id": 2,
//         "buyer_id": 1,
//         "created_at": "2020-04-30T14:26:08.000000Z",
//         "updated_at": "2020-05-04T10:13:30.000000Z",
//         "deleted_at": null,
//         "created_by": 1,
//         "updated_by": 1,
//         "deleted_by": null,
//         "buyer": {
//             "id": 1,
//             "name": "First",
//             "type": "buyer",
//             "created_at": null,
//             "updated_at": null,
//             "buyer_payments": [
//                 {
//                 }
//             ]
//         },
//         "exporters": [
//             {
//                 "id": 3,
//                 "name": "Third",
//                 "type": "exporter",
//                 "created_at": null,
//                 "updated_at": null,
//                 "pivot": {
//                     "contract_id": 1,
//                     "contractor_id": 3
//                 }
//             }
//         ],
//         "seller_contracts": [
//             {
//                 "id": 2,
//                 "weight": 1000,
//                 "pmt": 20,
//                 "commodity_id": 1,
//                 "seller_id": 2,
//                 "created_at": null,
//                 "updated_at": null,
//                 "deleted_at": null,
//                 "created_by": 1,
//                 "updated_by": null,
//                 "deleted_by": null,
//                 "number": "10000",
//                 "status": "active",
//                 "pivot": {
//                     "contract_id": 1,
//                     "seller_contract_id": 2,
//                     "weight": 100
//                 },
//                 "seller": {
//                     "id": 2,
//                     "name": "Second",
//                     "type": "seller",
//                     "created_at": null,
//                     "updated_at": null
//                 }
//             }
//         ]
//     },
// ]
