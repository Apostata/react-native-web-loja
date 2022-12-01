import {useEffect, useRef} from 'react';

export const useOld = (value: any, callback?: () => any): any => {
	const ref = useRef(null);
	useEffect(() => {
		ref.current = value; //assign the value of ref to the argument
		callback?.();
	}, [value, callback]); //this code will run when the value of 'value' changes
	return ref.current; //in the end, return the current ref value.
};
export default useOld;
