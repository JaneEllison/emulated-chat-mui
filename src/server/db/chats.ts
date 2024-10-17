import { Chat, ChatStatus } from "../types.ts";

export const chats: Chat[] = [
    {
        id: 16,
        firstName: "John",
        lastName: "Doe",
        title: "Software Engineer",
        avatarUrl: "avatar-10.jpg",
        initialsColor: null,
        backgroundColor: null,
        lastMessageText: "Hey, are we still on for the meeting?",
        lastMessageDate: "2024-10-17T19:59:00.000Z",
        status: ChatStatus.Online
    },
    {
        id: 17,
        firstName: "Emily",
        lastName: "Davis",
        title: "Data Scientist",
        avatarUrl: null,
        initialsColor: "#000000",
        backgroundColor: "#C70039",
        lastMessageText: "Can you review the latest dataset I sent?",
        lastMessageDate: "2024-10-14T15:47:00.000Z",
        status: ChatStatus.Offline
    },
    {
        id: 18,
        firstName: "Matthew",
        lastName: "Lee",
        title: "Security Analyst",
        avatarUrl: "avatar-11.jpg",
        initialsColor: null,
        backgroundColor: null,
        lastMessageText: "The security audit is complete.",
        lastMessageDate: "2024-09-26T10:15:00.000Z",
        status: ChatStatus.Busy
    },
    {
        id: 19,
        firstName: "Ava",
        lastName: "Allen",
        title: "Business Analyst",
        avatarUrl: null,
        initialsColor: "#8E44AD",
        backgroundColor: "#9B59B6",
        lastMessageText: "Meeting rescheduled to 3 PM.",
        lastMessageDate: "2024-06-06T20:30:00.000Z",
        status: ChatStatus.Offline
    }
];