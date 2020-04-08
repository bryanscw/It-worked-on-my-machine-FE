export const getTokenConfig = getState => {
    const token = getState().authReducer.access_token

    const config = {
        headers: {
            Authorization: 'bearer ' + token,
            'Content-Type': 'application/json;charset=UTF-8',
        }
    };

    return config;
}

export const getUser = getState => getState().authReducer.user;