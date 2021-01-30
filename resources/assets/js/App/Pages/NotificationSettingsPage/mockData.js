export const mockSettings = [
    {
        key: '1',
        title: 'System Messages',
        description:
            'System messages will be notified you in the channel type that you chose',
        checked: true,
    },
    {
        key: '2',
        title: 'To-do Notifications',
        description:
            'The to-do list will be notified in the channel type that you chose',
        checked: false,
    },
];

export const mockTableData = [
    {
        key: '1',
        notificationType: 'To-do Notification',
        channelType: 'Webapp',
        channelData: '-',
        checked: false,
    },
    {
        key: '2',
        notificationType: 'To-do Notification',
        channelType: 'E-mail',
        channelData: 'example@example.com',
        checked: true,
    },
    {
        key: '3',
        notificationType: 'To-do Notification',
        channelType: 'Phone number',
        channelData: '+12345678',
        checked: false,
    },
    {
        key: '4',
        notificationType: 'To-do Notification',
        channelType: 'E-mail',
        channelData: 'example@example.com',
        checked: true,
    },
];
