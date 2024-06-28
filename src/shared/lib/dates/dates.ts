const mapMonthToNumber: Record<string, string> = {
    января: '01',
    февраля: '02',
    марта: '03',
    апреля: '04',
    мая: '05',
    июня: '06',
    июля: '07',
    августа: '08',
    сентября: '09',
    октября: '10',
    ноября: '11',
    декабря: '12',
};

export function formatDate(date: string): string {
    const chunks = date.split(' ');
    return chunks[0] + '.' + mapMonthToNumber[chunks[1]] + '.' + chunks[2];
}
