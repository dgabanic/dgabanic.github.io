import { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './TravelMap.module.css';
import destinations from '../../data/destinations.json';

type Category = 'all' 
| 'travel' 
| 'coffee'
;

const CATEGORY_COLORS: Record<string, string> = {
  travel: 'yellow',
  coffee: 'brown',
};

function createIcon(category: string) {
  const color = CATEGORY_COLORS[category] ?? '#3498db';
  return L.divIcon({
    className: styles.customMarker,
    html: `<div style="background:${color};width:14px;height:14px;border-radius:50%;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.4)"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

function FlyToMarker({ lat, lng, children, icon }: { lat: number; lng: number; children: React.ReactNode; icon: L.DivIcon }) {
  const map = useMap();
  const markerRef = useRef<L.Marker>(null);

  return (
    <Marker
      ref={markerRef}
      position={[lat, lng]}
      icon={icon}
      eventHandlers={{
        click: () => {
          map.flyTo([lat, lng], 12, { duration: 1.2 });
        },
      }}
    >
      {children}
    </Marker>
  );
}

interface TravelMapProps {
  onBack: () => void;
}

export default function TravelMap({ onBack }: TravelMapProps) {
  const [filter, setFilter] = useState<Category>('all');

  const filtered = filter === 'all'
    ? destinations
    : destinations.filter((d) => d.category === filter);

  const categories: Category[] = ['all'
    , 'travel'
    , 'coffee'
  ];

  return (
    <section className={styles.wrapper}>
      <button className={styles.backBtn} onClick={onBack}>← Back</button>
      <h2 className={styles.heading}>🌍 Favorite Places</h2>

      <div className={styles.filters} role="group" aria-label="Filter destinations by category">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${filter === cat ? styles.active : ''}`}
            onClick={() => setFilter(cat)}
            aria-pressed={filter === cat}
          >
            {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className={styles.mapContainer}>
        <MapContainer
          center={[20, 0]}
          zoom={2}
          scrollWheelZoom={true}
          className={styles.map}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filtered.map((dest) => (
            <FlyToMarker key={dest.id} lat={dest.lat} lng={dest.lng} icon={createIcon(dest.category)}>
              <Popup maxWidth={260} className={styles.compactPopup}>
                {'images' in dest && dest.images && dest.images.length > 0 && (
                  <div className={styles.imageScroll}>
                    {(dest.images as string[]).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`${dest.name} ${idx + 1}`}
                        className={styles.popupImage}
                      />
                    ))}
                  </div>
                )}
                <strong>{dest.name}</strong>
                <br />
                <span style={{ fontSize: '0.85em', opacity: 0.8 }}>{dest.category}</span>
                {dest.description && <><br /><em>{dest.description}</em></>}
              </Popup>
            </FlyToMarker>
          ))}
        </MapContainer>
      </div>

      <div className={styles.legend}>
        {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
          <span key={cat} className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: color }} />
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </span>
        ))}
      </div>
    </section>
  );
}
