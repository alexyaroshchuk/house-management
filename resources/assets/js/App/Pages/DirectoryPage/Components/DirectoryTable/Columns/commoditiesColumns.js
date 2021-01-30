const commoditiesColumns = [
    {
        title: 'Commodity',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) =>
            record.logo ? `${text} (${record.logo.title})` : text,
    },
];

export default commoditiesColumns;
