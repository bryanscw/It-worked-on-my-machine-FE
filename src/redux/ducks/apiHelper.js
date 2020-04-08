// ACTIONS
export const STATUSES = {
    REQUEST: 'REQUEST',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
}

export const METHODS = {
    CREATE: 'CREATE',
    RETRIEVE: 'RETRIEVE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    LIST: 'LIST',
}

export function createApiAction(entityName, status, method, payload) {
    return {
        type: `${entityName.toUpperCase()}_${status}_${method}`,
        payload: payload
    }
}

// REDUCER
export function createApiReducer(entityName, id="id") {
    const initialState = {
        isLoading: {
            [METHODS.CREATE]: true,
            [METHODS.RETRIEVE]: true,
            [METHODS.UPDATE]: true,
            [METHODS.DELETE]: true,
            [METHODS.LIST]: true,
        },
        hasFailed: {},
        items: [],
        item: null,
    };

    return function reducer(state = initialState, action) {
        const actionTypePattern = /(.+)_(.+)_(.+)/;
        const match = action.type.match(actionTypePattern);

        if (!match)
            return state;

        const actionEntityName = match[1];
        const actionStatus = match[2];
        const actionMethod = match[3];

        if (actionEntityName !== entityName.toUpperCase() || !Object.values(METHODS).includes(actionMethod))
            return state;

        switch (actionStatus) {
            case STATUSES.REQUEST:
                return {
                    ...state,
                    isLoading: {
                        ...state.isLoading,
                        [actionMethod]: true
                    },
                    hasFailed: {
                        ...state.isLoading,
                        [actionMethod]: false
                    },
                };

            case STATUSES.SUCCESS:
                switch (actionMethod) {
                    case METHODS.CREATE:
                        return {
                            ...state,
                            isLoading: {
                                ...state.isLoading,
                                [actionMethod]: false
                            },
                            items: [...state.items, action.payload],
                        }

                    case METHODS.RETRIEVE:
                        return {
                            ...state,
                            isLoading: {
                                ...state.isLoading,
                                [actionMethod]: false
                            },
                            item: action.payload,
                        }
                        
                    case METHODS.UPDATE:
                        return {
                            ...state,
                            isLoading: {
                                ...state.isLoading,
                                [actionMethod]: false
                            },
                            items: state.items.map(item => (item[id] === action.payload[id]) ? action.payload : item),
                            item: action.payload,
                        }

                    case METHODS.DELETE:
                        return {
                            ...state,
                            isLoading: {
                                ...state.isLoading,
                                [actionMethod]: false
                            },
                            items: state.items.filter(item => item[id] !== action.payload),
                        }

                    case METHODS.LIST:
                        return {
                            ...state,
                            isLoading: {
                                ...state.isLoading,
                                [actionMethod]: false
                            },
                            items: action.payload.content
                        }

                    default:
                        return state;
                }
            
            case STATUSES.FAILURE:
                return {
                    ...state,
                    isLoading: {
                        ...state.isLoading,
                        [actionMethod]: false
                    },
                    hasFailed: {
                        ...state.isLoading,
                        [actionMethod]: true
                    },
                };

            default:
                return state;
        }
    }
}