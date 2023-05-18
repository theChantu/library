import { createContext, useState } from "react";

export const LoadingContext = createContext(null);

const LoadingContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    // isLoading ? (this will be important so that components will have there own loading handler and I can just pass this into them)
    // And I can also pass setIsLoading to be handled the same way, if user modifies a book for example just set loading to true and itll rerender
    // Not allowing user to edit anything (disable stuff, low opacity) (or just put overlays on stuff)

    let value = {
        isLoading,
        setIsLoading,
    };

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    );
};

export default LoadingContextProvider;
