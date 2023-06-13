
import { createGlobalState } from 'react-hooks-global-state';

const {setGlobalState,useGlobalState} =createGlobalState({
    count : 1,
});

export {useGlobalState,setGlobalState};