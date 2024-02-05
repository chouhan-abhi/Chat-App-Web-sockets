const socket  = io('ws://localhost:3000');

socket.on('getHistory', res => {
    const el = document.createElement('li');
    el.innerHTML = `${res.userName}: ${res?.userMessage}`;
    document.querySelector('ul').appendChild(el);
})

socket.on('pullMessage', res => {
    const el = document.createElement('li');
    el.innerHTML = `${res.userName}: 
        <dv>
            <b> ${res?.userMessage} </b>
        </div>
    `;
    document.querySelector('ul').appendChild(el);
})

document.querySelector('button').onclick = () => { 
    const userMessage = document.querySelector('#chatInput').value;
    const userName = document.querySelector('#name').value;
    socket.emit('pullMessage', {userName, userMessage});
    document.querySelector('#chatInput').value = '';
}