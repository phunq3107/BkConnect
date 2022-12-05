import store from "../../configs/store";

export const HandleResponse = (response, errorReceiver, errType) => {
    if (response.status !== 200){
        return //TODO: handle response with status !== 200
    }
    const dataOfResponse = response.data
    if (dataOfResponse.code !== 200){
        const error = {
            message:dataOfResponse.message,
            code:dataOfResponse.code,
            type: errType ?? null
        }
        store.dispatch(errorReceiver(error))

        return
    }
    return dataOfResponse.data
}