
const state={
    serverAddress: 'localhost',
    serverPort: '8081',
    serverPath: 'Bioskop/api',
    serverPathWithDomain: 'https://java-owp-projekat-bioskop.herokuapp.com/api',
    frontendFullAdress: location.hostname
}

const getters={
    getServerAddress: state => state.serverAddress,
    getServerPort: state => state.serverPort,
    getFullServerAddress: state => `${state.serverPathWithDomain}`,//`http://${state.serverAddress}:${state.serverPort}/${state.serverPath}`,
    getFrontendFullAdress: state => `http://${state.frontendFullAdress}`
}


export default{
    state,
    getters
    
}