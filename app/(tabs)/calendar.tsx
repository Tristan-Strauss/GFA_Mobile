// import React, { useState, useEffect } from 'react';
// import { Calendar } from 'react-native-calendars';
// import { DateTime } from "luxon";
// import { Alert, View, Text, StyleSheet } from 'react-native';

// interface DatePeriod {
//     start: string;
//     end: string;
//     color: string;
//     description: string;
// }

// const generateDateRange = (startDate: string, endDate: string) => {
//     const start = DateTime.fromISO(startDate);
//     const end = DateTime.fromISO(endDate);
//     const dates = [];
//     let currentDate = start;
//     while (currentDate.toISODate() <= end.toISODate()) {
//         dates.push(currentDate.toISODate());
//         currentDate = currentDate.plus({ days: 1 });
//     }
//     return dates;
// };

// const markPeriod = (startDate: string, endDate: string, color: string) => {
//     const dateRange = generateDateRange(startDate, endDate);
//     const marked: Record<string, { color: string; textColor: string; startingDay?: boolean; endingDay?: boolean; selected?: boolean }> = {};

//     dateRange.forEach((date, index) => {
//         marked[date] = {
//             color: color,
//             textColor: 'white',
//         };
//         if (date === startDate) {
//             marked[date].startingDay = true;
//         }
//         if (date === endDate) {
//             marked[date].endingDay = true;
//         }
//         if (index > 0 && index < dateRange.length - 1) {
//             marked[date].selected = true;
//         }
//     });

//     return marked;
// };

// const EventCalendarView = () => {
//     const [markedDates, setMarkedDates] = useState<Record<string, { color: string; textColor: string; startingDay?: boolean; endingDay?: boolean; selected?: boolean }>>({});
//     const [eventDescriptions, setEventDescriptions] = useState<Record<string, string>>({});

//     const dateList: DatePeriod[] = [
//         {
//             "start": "2025-05-05",
//             "end": "2025-05-17",
//             "color": "green",
//             "description": "Morocco"
//         },
//         {
//             "start": "2025-05-07",
//             "end": "2025-05-09",
//             "color": "blue",
//             "description": "South Sudan"
//         },
//         {
//             "start": "2025-05-30",
//             "end": "2025-05-31",
//             "color": "yellow",
//             "description": "Lesotho"
//         },
//         {
//             "start": "2025-06-06",
//             "end": "2025-06-08",
//             "color": "orange",
//             "description": "Malawi"
//         },
//         {
//             "start": "2025-06-13",
//             "end": "2025-06-15",
//             "color": "purple",
//             "description": "South Sudan"
//         },
//         {
//             "start": "2025-06-19",
//             "end": "2025-06-22",
//             "color": "lime",
//             "description": "Mozambique"
//         },
//         {
//             "start": "2025-06-20",
//             "end": "2025-06-22",
//             "color": "teal",
//             "description": "Namibia"
//         },
//         {
//             "start": "2025-07-04",
//             "end": "2025-07-06",
//             "color": "pink",
//             "description": "Lesotho"
//         },
//         {
//             "start": "2025-07-17",
//             "end": "2025-07-21",
//             "color": "brown",
//             "description": "Zambia"
//         },
//         {
//             "start": "2025-07-27",
//             "end": "2025-08-02",
//             "color": "silver",
//             "description": "Angola"
//         },
//         {
//             "start": "2025-08-06",
//             "end": "2025-08-10",
//             "color": "maroon",
//             "description": "Lesotho"
//         },
//         {
//             "start": "2025-08-14",
//             "end": "2025-08-17",
//             "color": "olive",
//             "description": "Cameroon"
//         },
//         {
//             "start": "2025-08-18",
//             "end": "2025-08-21",
//             "color": "navy",
//             "description": "Nigeria"
//         },
//         {
//             "start": "2025-08-19",
//             "end": "2025-08-22",
//             "color": "aqua",
//             "description": "Zambia"
//         },
//         {
//             "start": "2025-08-22",
//             "end": "2025-08-24",
//             "color": "fuchsia",
//             "description": "Benin"
//         },
//         {
//             "start": "2025-08-25",
//             "end": "2025-08-28",
//             "color": "gray",
//             "description": "Togo"
//         },
//         {
//             "start": "2025-09-12",
//             "end": "2025-09-14",
//             "color": "red",
//             "description": "Burundi"
//         },
//         {
//             "start": "2025-09-17",
//             "end": "2025-09-21",
//             "color": "green",
//             "description": "Lesotho"
//         },
//         {
//             "start": "2025-10-10",
//             "end": "2025-10-12",
//             "color": "blue",
//             "description": "Mozambique"
//         },
//         {
//             "start": "2025-11-26",
//             "end": "2025-11-29",
//             "color": "yellow",
//             "description": "South Sudan"
//         },
//         {
//             "start": "2025-12-05",
//             "end": "2025-12-07",
//             "color": "orange",
//             "description": "Eswathini"
//         }
//     ];

//     useEffect(() => {
//         let allMarkedDates: Record<string, { color: string; textColor: string; startingDay?: boolean; endingDay?: boolean; selected?: boolean }> = {};
//         let allEventDescriptions: Record<string, string> = {};

//         dateList.forEach((datePeriod) => {
//             const periodMarks = markPeriod(datePeriod.start, datePeriod.end, datePeriod.color);
//             allMarkedDates = { ...allMarkedDates, ...periodMarks };

//             const dateRange = generateDateRange(datePeriod.start, datePeriod.end);
//             dateRange.forEach(date => {
//                 allEventDescriptions[date] = datePeriod.description;
//             });
//         });

//         setMarkedDates(allMarkedDates);
//         setEventDescriptions(allEventDescriptions);
//     }, []);

//     const onDayPress = (day: { dateString: string; day: number; month: number; year: number }) => {
//         if (eventDescriptions[day.dateString]) {
//             Alert.alert(eventDescriptions[day.dateString]);
//         }
//     };

//     return (
//         <View>
//             <Text style={styles.heading}>Mission Dates</Text>
//             <Calendar
//                 markedDates={markedDates}
//                 markingType={'period'}
//                 onDayPress={onDayPress}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     heading: {
//         textAlign: "center",
//         fontWeight: "bold",
//         fontSize: 40,
//         paddingVertical: 20
//     }
// })

// export default EventCalendarView;