import { useState } from "react";

export default function useLoad(func){
    const [load, setLoad] = useState(false)

    async function call(){
        await func()
        setLoad(true)
    }

    return [call, load]
}