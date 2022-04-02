export const hasAnyRole=(role,hasAnyRoles)=>{

    if(roles&&roles.length!==0)
    {
        if(hasAnyRoles.length===0){
            return true;
        }
        return hasAnyRole.some(r>roles.includes(r));
    }
    return false;
}