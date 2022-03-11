import Axios from 'axios';
import React , {useEffect, useState} from 'react';


function useFlip(initialFlipState=true) {
    const [isFlipped , setFlipped] = useState(initialFlipState);

    const flip = () => {
        setFlipped(isUp => !isUp);
    };

    return [isFlipped , flip]
}

function useAxios(keyInLs , baseUrl) {
    const [responses , setResponses] = useLocalStorage(keyInLs);

    const addResponseData = async(formatter = data => data , restOfUrl = "") => {
        const response = await Axios.get(`${baseUrl}${restOfUrl}`);
        setResponses(data => [...data , formatter(response.data)])
    };

    const clearResponses = () => setResponses([]);

    return [responses , addResponseData , clearResponses];
}



function useLocalStorage(key , initialValue = []) {
    if(localStorage.getItem(key)) {
        initialValue=JSON.parse(localStorage.getItem(key));
    }
    const [value , setValue] = useState(initialValue);

    useEffect( () => {
        localStorage.setItem(key , JSON.stringify(value));
    } , [value , key])

    return [value , setValue]
}


export default useLocalStorage
export {useFlip , useAxios , useLocalStorage};