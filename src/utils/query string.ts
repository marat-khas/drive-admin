export const queryString = (obj: Record<string, any>) =>
    Object.entries(obj)
        .reduce((acc: string[], [key, val]) => {
            if (val) {
                acc.push(`${key}=${val}`);
            }
            return acc;
        }, [])
        .join('&');
