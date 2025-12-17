import { format, parseISO } from 'date-fns';

export const formatDate = (dateString: string): string => {
    try {
        const date = parseISO(dateString);
        return format(date, 'MMM dd, yyyy');
    } catch {
        return 'Unknown date';
    }
};

export const truncateText = (text: string, maxLength: number): string => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

export const getDefaultImage = (): string => {
    return 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=250&fit=crop';
};

export const validateImageUrl = (url: string | null): string => {
    if (!url || url.includes('removed.png')) {
        return getDefaultImage();
    }
    return url;
};
