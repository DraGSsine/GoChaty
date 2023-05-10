import { differenceInHours, differenceInMinutes,differenceInDays } from "date-fns";

export function UseDateAgo(date) {
  const MinutesAgo = differenceInMinutes(new Date(), date.toDate());
  if(MinutesAgo > 1){
    if (MinutesAgo >= 60) {
      const HoursAgo = differenceInHours(new Date(), date.toDate());
      if (HoursAgo >= 24) {
        const DaysAgo = differenceInDays(new Date(), date.toDate());
        return `${DaysAgo} d Ago`;
      } else {
        return `${HoursAgo} hr ago`;
      }
    } else {
      return `${MinutesAgo} min Ago`;
    }
  }else{
    return `Just Now`
  }
}
