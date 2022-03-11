import React , {useEffect, useState} from 'react';
import axios from 'axios';

const useAxios = (url) => {
    const [response , setResponse] = useState(null);
    const [error , setError] = useState(null);

    useEffect( () => {
        const fetchData = async () => {
            
                const res = await axios.get(url);
                setResponse(res)
          
            
        }
        fetchData();
    } , [url]);

    return [response]

}

export default useAxios;