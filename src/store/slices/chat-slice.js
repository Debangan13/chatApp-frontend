export const createChatSlice = (set, get) => ({
	selectedChatType: undefined,
	selectedChatData: undefined,
	selectedChatMessages: [],
	directMessagesContacts: [],
	setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
	setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
	setSelectedChatMessages: (selectedChatMessages) =>
		set({ selectedChatMessages }),
	setDirectMessagesContacts: (directMessagesContacts) =>
		set({ directMessagesContacts }),

	closeChat: () =>
		set({
			selectedChatData: undefined,
			selectedChatType: undefined,
			selectedChatMessages: [],
		}),
	addMessage: (message) => {
		const selectedChatMessages = get().selectedChatMessages;
		const selectedChatType = get().selectedChatType;
		console.log("in addmessages::", selectedChatMessages, selectedChatType);

		set({
			selectedChatMessages: [
				...selectedChatMessages,
				{
					...message,
					recipient:
						selectedChatType === "channel"
							? message.recipient
							: message.recipient._id,
					sender:
						selectedChatType === "channel"
							? message.recipient
							: message.sender._id,
				},
			],
		});
	},
});
