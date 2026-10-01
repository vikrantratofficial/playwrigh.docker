require('dotenv').config();
const { connectMongo, mongoose } = require('../mongo');
const Project = require('../models/Project');

const projects = [
  {
    id: 'jmeter-performance-load-testing',
    title: 'JMeter Performance & Load Testing Suite',
    summary: 'Load, stress and performance testing framework validating API response times and system stability under concurrent user load.',
    category: 'Performance Testing',
    tags: ['JMeter', 'Performance', 'Load Testing'],
    role: 'QA Performance Engineer',
    duration: '6 weeks',
    client: 'B2B SaaS Platform',
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    overview:
      'Ahead of a major release, the client had no visibility into how the platform behaved under real-world concurrent load, risking downtime during peak traffic. The team needed repeatable load tests integrated into the release process, not one-off manual checks.',
    approach: [
      'Modeled realistic user journeys with JMeter Thread Groups, driven by CSV test data for login, search and checkout flows.',
      'Ramped load gradually (50 to 1000 concurrent users) to identify the breaking point rather than testing only at a single fixed load.',
      'Correlated JMeter results (p90/p95/p99 response time, throughput, error rate) with server-side metrics (CPU, memory, DB query time) to pinpoint bottlenecks.',
      'Automated test execution via a scheduled Jenkins job, converting raw .jtl results into a stakeholder-readable HTML report after every run.',
    ],
    findings: [
      'Identified a missing database index causing p95 latency to spike to 4.1s at 400+ concurrent users.',
      'Found the session store became a bottleneck above 600 concurrent users, informing a caching layer decision.',
      'Established a baseline performance budget the team now checks before every major release.',
    ],
    stack: ['JMeter', 'Jenkins', 'Grafana', 'MySQL'],
    metrics: [
      { label: 'Max concurrent users validated', value: '1000' },
      { label: 'P95 latency after fix', value: '4.1s → 820ms' },
      { label: 'Load test scenarios automated', value: '18' },
    ],
  },
  {
    id: 'mobile-app-test-automation',
    title: 'Mobile App Test Automation (iOS & Android)',
    summary: 'Cross-platform mobile test automation framework covering critical user flows on real devices and emulators for a field-operations app.',
    category: 'Mobile Testing',
    tags: ['Mobile Testing', 'Appium', 'Automation'],
    role: 'QA Automation Engineer',
    duration: '2 months',
    client: 'Field Inspection Platform',
    cover: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    overview:
      'A field-operations app used by inspectors on Android and iOS had no automated coverage, so every release relied on slow, inconsistent manual regression across both platforms and multiple device models.',
    approach: [
      'Built a cross-platform Appium framework with a shared Page Object layer for Android and iOS to avoid duplicating test logic.',
      'Covered critical workflows: login, offline data capture, photo upload, GPS-tagged inspections, and sync-on-reconnect.',
      'Ran the suite across real devices and emulators via BrowserStack App Automate for broader device/OS coverage.',
      'Integrated test runs into CI so every build was validated on both platforms before QA sign-off.',
    ],
    findings: [
      'Caught a data-loss bug where offline-captured inspections were silently dropped if the app was backgrounded during sync.',
      'Found GPS coordinates were occasionally truncated on specific Android OEM devices, affecting inspection accuracy.',
      'Reduced manual regression time per release from 2 days to under 3 hours.',
    ],
    stack: ['Appium', 'Java', 'TestNG', 'BrowserStack', 'Jenkins'],
    metrics: [
      { label: 'Regression time', value: '2 days → 3 hrs' },
      { label: 'Devices covered', value: '12+' },
      { label: 'Critical bugs caught pre-release', value: '7' },
    ],
  },
];

(async () => {
  await connectMongo();
  for (const project of projects) {
    const existing = await Project.findOne({ id: project.id });
    if (existing) {
      console.log(`"${project.title}" already exists, updating...`);
      await Project.findOneAndUpdate({ id: project.id }, project);
    } else {
      await Project.create(project);
      console.log(`Created "${project.title}".`);
    }
  }
  await mongoose.disconnect();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
