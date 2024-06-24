import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export function formatRelativeDate(dateString: string): string {
    const dateParts = dateString.split(' ');
    const formattedDateString = `${dateParts[1]} ${dateParts[2]} ${dateParts[5]} ${dateParts[3]} GMT+0300`;

    const date = new Date(formattedDateString);
    if (isNaN(date.getTime())) {
        throw new Error('Invalid Date');
    }

    const now = new Date();

    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInHours < 24) {
        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;
        if (hours > 0) {
            return `${hours} saat ${minutes} dakika önce`;
        } else {
            return `${minutes} dakika önce`;
        }
    } else if (diffInDays < 7) {
        return `${diffInDays} gün önce`;
    } else if (diffInDays < 30) {
        return `${diffInWeeks} hafta önce`;
    } else if (diffInDays < 365) {
        return `${diffInMonths} ay önce`;
    } else {
        return format(date, 'dd MMMM yyyy', { locale: tr });
    }
}