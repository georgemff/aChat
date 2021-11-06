import { IUserStore } from '../interfaces/interfaces'
import {LOAD_USER, CHOOSE_TARGET, TARGET_USERS, NEW_MESSAGE} from './types'

export const loadUser = (userData: IUserStore) => {
    return {
        type: LOAD_USER,
        payload: userData
    }
}

export const chooseTarget = (targetId: string) => {
    return {
        type: CHOOSE_TARGET,
        payload: targetId
    }
}

export const loadTargetUsers = (targets: IUserStore[]) => {
    return {
        type: TARGET_USERS,
        payload: targets
    }
}

export const newMessage = (newMessage: any) => {
    return {
        type: NEW_MESSAGE,
        payload: newMessage
    }
}
