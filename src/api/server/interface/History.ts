export default interface History{
    messageType: 'notice' | 'warning' | 'danger',
    message: string,
}