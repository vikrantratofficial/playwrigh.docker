require('dotenv').config();
const { connectMongo, mongoose } = require('../mongo');
const BlogPost = require('../models/BlogPost');

const post = {
  id: 'load-testing-with-jmeter',
  title: 'Load Testing with JMeter: A Practical Playbook for QA Teams',
  excerpt: 'How to design realistic load scenarios, read thread group results, and turn JMeter runs into actionable performance reports.',
  date: '2026-08-28',
  tags: ['Load Testing', 'JMeter', 'Performance'],
  content:
    'Load testing often gets bolted on at the end of a release cycle as an afterthought, which is why it rarely catches real bottlenecks. ' +
    'This post covers a practical JMeter workflow: modeling realistic user journeys with Thread Groups and CSV-driven test data, ' +
    'ramping load gradually to find the breaking point rather than jumping straight to peak concurrency, and reading beyond average ' +
    'response time into percentiles (p90/p95/p99), throughput, and error rate to separate real degradation from noise. It also walks ' +
    "through distributed load generation for higher concurrency, correlating JMeter results with server-side metrics (CPU, memory, DB " +
    'query time) to pinpoint the actual bottleneck, and turning raw .jtl results into a report stakeholders can act on before a release.',
};

(async () => {
  await connectMongo();
  const existing = await BlogPost.findOne({ id: post.id });
  if (existing) {
    console.log('Post already exists, updating...');
    await BlogPost.findOneAndUpdate({ id: post.id }, post);
  } else {
    await BlogPost.create(post);
    console.log('Post created.');
  }
  await mongoose.disconnect();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
