import React, { use } from 'react';
import AuthContext from '../Context/AuthContext';

const useAuthcontext = () => {
    const authInfo = use(AuthContext);
    return authInfo;
};

export default useAuthcontext;