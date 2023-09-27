/**
 * This method will help to determine if condition is met or not
 * and stop code execution in saga
 * @param {Function} conditionMethod method which handles the condition
 * @returns 
 */
export  const waitForCondition = ( conditionMethod ) => {
    const poll = ( resolve ) => {
        if(conditionMethod()) resolve();
        else setTimeout(()=>poll(resolve));
    }
    return new Promise(poll)
}

export default waitForCondition;