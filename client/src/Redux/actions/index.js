export const signIn = () => {
    return {
        type: 'SIGNIN'
    }
}

export const signOut = () => {
    return {
        type: 'SIGNOUT'
    }
}

export const storeUser = (userObject) => ({
    type: 'STORE_USER',
    payload: {userObject}
})

export const joinRoom = (roomCode) => ({
    type: 'JOINROOM',
    payload: roomCode
})