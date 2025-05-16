import { createContext, useContext, createSignal } from 'solid-js';

const PageContext = createContext();

export const PageProvider = (props) => {
    const [getSelectedPage, setSelectedPage] = createSignal('home');

    const handleSelectPage = (page) => {
        setSelectedPage(page);
    };

    return (
        <PageContext.Provider value={{ getSelectedPage, handleSelectPage }}>
            {props.children}
        </PageContext.Provider>
    );
};

export const usePageContext = () => {
    const context = useContext(PageContext);
    if (!context) {
        throw new Error('usePageContext must be used within a PageProvider');
    }
    return context;
};