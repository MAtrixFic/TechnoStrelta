type InputsType = {
    current: HTMLInputElement[];
}

type CancelType = {
    data: ResetDataType;
    resetData: (data: ResetDataType) => void,
    setLoadData: (state: boolean) => void
}

type ResetDataType = {
    inputs: InputsType,
    resetLocalData: (data: any | undefined) => void,
    resetGlobalData: (data: any | undefined) => void
}

export const buttonOperations = {
    cancel: function ({ data, resetData, setLoadData }: CancelType) {
        resetData(data);
        setLoadData(false)
    },
    resetData: function ({ inputs, resetLocalData, resetGlobalData }: ResetDataType) {
        let i = 0
        for (let element of inputs.current) {
            i += 1
            if(i == 3)
                break
            element.value = ''
        }
        resetLocalData(undefined);
        resetGlobalData(undefined)
    }
}

