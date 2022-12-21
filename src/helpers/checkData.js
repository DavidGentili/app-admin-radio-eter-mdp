export function getCorrectData(state, securityLevel, user){
    const updateData = {};
    if(state !== user.state)
            updateData['state'] = state;
    if(securityLevel !== user.securityLevel)
        updateData['securityLevel'] = securityLevel;
    return (Object.keys(updateData).length) ? updateData : null
}