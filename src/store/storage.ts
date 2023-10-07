export const loadData = (key: string) => {
    try {
        const data = localStorage.getItem(key);
        if(!data) {
            return undefined;
        } return JSON.parse(data);
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

export const keepData = <T>(key: string, data: T) => {
    const token = JSON.stringify(data);
    localStorage.setItem(key, token);
};