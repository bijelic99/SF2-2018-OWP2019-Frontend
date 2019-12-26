
const state={
    serverAddress: '192.168.1.250',
    serverPort: '8081'
}

const getters={
    getServerAddress: state => state.serverAddress,
    getServerPort: state => state.serverPort,
    getFullServerAddress: state => `http://${state.serverAddress}:${state.serverPort}`
}


export default{
    state,
    getters
    
}