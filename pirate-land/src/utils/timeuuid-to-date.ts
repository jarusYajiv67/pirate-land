export const GREGORIAN_OFFSET = 122192928000000000;

export const getTimeInt = (uuid_str: string) => {
    const uuid_arr = uuid_str.split('-');
    const time_str = [uuid_arr[2].substring(1), uuid_arr[1], uuid_arr[0]].join('');
    return parseInt(time_str, 16);
};

export const getDateObj = (uuid_str: string) => {
    const int_time = getTimeInt(uuid_str) - GREGORIAN_OFFSET;
    const int_millisec = Math.floor(int_time / 10000);
    return new Date(int_millisec);
};
