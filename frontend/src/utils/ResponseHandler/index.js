import {setError} from "../../features/Auth/sessionSlice";
import store from "../../configs/store";

export const HandleResponse = (response, errorReceiver) => {
    if (response.status !== 200){
        return //TODO: handle response with status !== 200
    }
    const dataOfResponse = response.data
    if (dataOfResponse.code !== 200){
        const error = {
            message:dataOfResponse.message,
            code:dataOfResponse.code
        }
        store.dispatch(errorReceiver(error))

        return
    }
    return dataOfResponse.data
}