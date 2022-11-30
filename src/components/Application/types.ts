export type initialStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialized: boolean
}
//types
export type RequestStatusType = 'idle' | 'loading' | 'success' | 'failed'