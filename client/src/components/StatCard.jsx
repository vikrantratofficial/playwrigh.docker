import CountUp from './CountUp';

export default function StatCard({ icon, value, suffix = '', label }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-value">
        <CountUp end={value} suffix={suffix} />
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
