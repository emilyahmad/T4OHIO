import "./Map.css";

const MAP_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3073.7001210515964!2d-84.16215212398288!3d39.61143727158048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88408f83aaac65af%3A0xa78426d198186c18!2sT4%20(Tea%20For%20U)%20Bubble%20Tea%20Cafe%20SnackBar!5e0!3m2!1sen!2sus!4v1774737859207!5m2!1sen!2sus";
const ADDRESS = "9146 Dayton-Lebanon Pike, Centerville, OH 45458";

// Apple devices get Apple Maps (which opens the app); everything else gets Google Maps, which opens its app on Android
function directionsUrl() {
  const dest = encodeURIComponent(ADDRESS);
  const ua = navigator.userAgent;
  const isApple = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  return isApple
    ? `https://maps.apple.com/?daddr=${dest}&dirflg=d`
    : `https://www.google.com/maps/dir/?api=1&destination=${dest}`;
}

// Store hours in 24-hour time (Ohio time); null = closed
const HOURS = [
  { day: "Monday", hours: null },
  { day: "Tuesday", hours: [11, 19] },
  { day: "Wednesday", hours: [11, 19] },
  { day: "Thursday", hours: [11, 19] },
  { day: "Friday", hours: [11, 19] },
  { day: "Saturday", hours: [11, 19] },
  { day: "Sunday", hours: [11, 19] },
];

function formatHour(h) {
  const suffix = h < 12 ? "AM" : "PM";
  return `${h % 12 || 12} ${suffix}`;
}

// Today's day name and whether the store is open right now, in the store's time zone
function storeStatus() {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", weekday: "long", hour: "numeric", minute: "numeric", hourCycle: "h23" })
      .formatToParts(new Date())
      .map((p) => [p.type, p.value])
  );
  const today = HOURS.find((d) => d.day === parts.weekday);
  const time = Number(parts.hour) + Number(parts.minute) / 60;
  const open = Boolean(today?.hours) && time >= today.hours[0] && time < today.hours[1];
  return { today: parts.weekday, open };
}

function Map() {
  const { today, open } = storeStatus();

  return (
    <section className="map">
      <h1>Store Information</h1>
      <div className="store-info">
        <div className="store-map">
          <iframe
            src={MAP_EMBED}
            title="Map showing T4 Ohio at 9146 Dayton-Lebanon Pike, Centerville, OH"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className="store-details">
          <div className="store-block">
            <h3><i className="fa-solid fa-location-dot" aria-hidden="true"/> Visit us</h3>
            <address>
              9146 Dayton-Lebanon Pike (RT-48)<br/>
              Centerville, OH 45458
            </address>
            <a className="store-directions" href={directionsUrl()} target="_blank" rel="noreferrer">
              Get directions <i className="fa-solid fa-arrow-right" aria-hidden="true"/>
            </a>
          </div>

          <div className="store-block">
            <h3>
              <i className="fa-regular fa-clock" aria-hidden="true"/> Store hours
              <span className={open ? "store-status open" : "store-status"}>{open ? "Open now" : "Closed now"}</span>
            </h3>
            <table className="store-hours">
              <tbody>
                {HOURS.map(({ day, hours }) => (
                  <tr key={day} className={day === today ? "today" : undefined}>
                    <th scope="row">{day}</th>
                    <td>{hours ? `${formatHour(hours[0])} – ${formatHour(hours[1])}` : "Closed"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Map;
