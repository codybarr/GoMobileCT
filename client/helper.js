let go = {

    sortEvents: function(events) {
        const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

        let sorted_events = {};

        for (let day of DAYS) {
            sorted_events[day] = events.filter( (event) => {
                return event.dayOfWeek === day;
            });

            sorted_events[day].sort( (a, b) => {
            	if (a.startTime < b.startTime) return -1;
            	if (a.startTime > b.startTime) return 1;
            	return 0;
            });
        }

        let final_events = [];

        for (let day of DAYS) {
            for (let event of sorted_events[day]) {
                final_events.push(event);
            }
        }

        return final_events;
    }
};

module.exports = go;
