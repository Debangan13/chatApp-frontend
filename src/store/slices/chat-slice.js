export const createChatSlice = (set) => ({
	selectedChatType: undefined,
	selectedChatData: undefined,
	selectedChatMessages: [],
	setSelectedChatType: (setSelectedChatType) => set({ setSelectedChatType }),
	setSelectedChatData: (setSelectedChatData) => set({ setSelectedChatData }),
	setSelectedChatMessages: (selectedChatMessages) =>
		set({ selectedChatMessages }),
	closeChat: () =>
		set({
			selectedChatData: undefined,
			selectedChatType: undefined,
			selectedChatMessages: [],
		}),
});
