import {
    serverEvents,
    userTypes
} from './constants.js';

const InteractionRecords = [];
const userMap = new Map();

function handleNewConnection(io, clientID) {
    if (userMap?.has(clientID)) return;
    userMap.set(clientID, userTypes.anonymous);
    InteractionRecords.forEach(interaction => io.emit(serverEvents?.getHistory, interaction));
}

function subscribePublishMessageEvent(socket, io, clientID) {
    const handlePulledMessages = (response) => {
        const { userName, userMessage } = response;
        const interaction = { userName: userName || 'Anonymous', userMessage };
        if (userMap.has(clientID) === userTypes.anonymous && userName) {
            userMap.set(clientID, userName);
        }
        InteractionRecords.push(interaction)
        io.emit(serverEvents?.pullMessage, interaction);
    }
    socket.on(serverEvents?.pullMessage, response => handlePulledMessages(response));
}

function subscribeLogoutEvent(socket, io) {
    const logoutEvent = () => {
        InteractionRecords = [];
        userMap.delete(clientID);
    }
    socket.on('logOut', () => logoutEvent())
}

export default function App(socket, io) {
    try {
        const clientID = socket?.client?.id;

        handleNewConnection(io, clientID);
        subscribePublishMessageEvent(socket, io, clientID)
        subscribeLogoutEvent(socket, io);
    } catch (error) {
        console.error('Error in server execution = ', error)
    }
}