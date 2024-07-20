import React from 'react';
const protocol = process.env.REACT_APP_PROTOCOL;
const hostname = process.env.REACT_APP_HOSTNAME;
const port = process.env.REACT_APP_PORT;
const baseUrl = `${protocol}://${hostname}:${port}`;

export const ConfigContext = React.createContext({ baseUrl });

export const ConfigProvider = ({ children }) => (
    <ConfigContext.Provider value={{ baseUrl }}>
        {children}
    </ConfigContext.Provider>
);