import { mkdir, writeFile } from 'node:fs/promises';

const login = process.env.GITHUB_REPOSITORY_OWNER;
const token = process.env.GH_TOKEN;

if (!login || !token) {
  throw new Error('GITHUB_REPOSITORY_OWNER and GH_TOKEN are required');
}

async function graphql(query, variables) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: 'bearer ' + token,
      'Content-Type': 'application/json',
      'User-Agent': 'profile-streak-generator'
    },
    body: JSON.stringify({ query, variables })
  });

  const payload = await response.json();
  if (!response.ok || payload.errors) {
    throw new Error(JSON.stringify(payload.errors || payload));
  }
  return payload.data;
}

const profile = await graphql(
  'query($login:String!){user(login:$login){createdAt}}',
  { login }
);

const createdAt = profile.user.createdAt;
const now = new Date();
const currentYear = Number(
  new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    year: 'numeric'
  }).format(now)
);
const firstYear = new Date(createdAt).getUTCFullYear();
const days = new Map();

for (let year = firstYear; year <= currentYear; year += 1) {
  const from = year + '-01-01T00:00:00Z';
  const yearEnd = year + '-12-31T23:59:59Z';
  const to = year === currentYear ? now.toISOString() : yearEnd;

  const data = await graphql(
    'query($login:String!,$from:DateTime!,$to:DateTime!){user(login:$login){contributionsCollection(from:$from,to:$to){contributionCalendar{weeks{contributionDays{date contributionCount}}}}}}',
    { login, from, to }
  );

  for (const week of data.user.contributionsCollection.contributionCalendar.weeks) {
    for (const day of week.contributionDays) {
      days.set(day.date, day.contributionCount);
    }
  }
}

function kstToday() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(now);
  const part = (type) => parts.find((item) => item.type === type).value;
  return part('year') + '-' + part('month') + '-' + part('day');
}

function shift(date, amount) {
  const value = new Date(date + 'T00:00:00Z');
  value.setUTCDate(value.getUTCDate() + amount);
  return value.toISOString().slice(0, 10);
}

function formatDate(date, includeYear = false) {
  if (!date) return '—';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    ...(includeYear ? { year: 'numeric' } : {}),
    timeZone: 'UTC'
  }).format(new Date(date + 'T00:00:00Z'));
}

const ordered = [...days.entries()].sort(([a], [b]) => a.localeCompare(b));
const total = ordered.reduce((sum, [, count]) => sum + count, 0);

let longest = 0;
let longestStart = null;
let longestEnd = null;
let running = 0;
let runningStart = null;
let previous = null;

for (const [date, count] of ordered) {
  const consecutive = previous && shift(previous, 1) === date;
  if (count > 0) {
    if (!consecutive || running === 0) {
      running = 1;
      runningStart = date;
    } else {
      running += 1;
    }
    if (running > longest) {
      longest = running;
      longestStart = runningStart;
      longestEnd = date;
    }
  } else {
    running = 0;
    runningStart = null;
  }
  previous = date;
}

const today = kstToday();
let cursor = today;
if ((days.get(cursor) || 0) === 0) cursor = shift(cursor, -1);

let current = 0;
let currentStart = null;
let currentEnd = null;
while ((days.get(cursor) || 0) > 0) {
  if (!currentEnd) currentEnd = cursor;
  currentStart = cursor;
  current += 1;
  cursor = shift(cursor, -1);
}

const createdDate = createdAt.slice(0, 10);
const accountRange = formatDate(createdDate, true) + ' – Present';
const currentRange = current
  ? formatDate(currentStart) + ' – ' + formatDate(currentEnd)
  : 'No active streak';
const longestRange = longest
  ? formatDate(longestStart) + ' – ' + formatDate(longestEnd)
  : 'No streak yet';

const svg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="495" height="195" viewBox="0 0 495 195" role="img" aria-label="GitHub contribution streak">' +
  '<style>' +
  '.bg{fill:#1a1b27;stroke:#2e3348}.divider{stroke:#a9b1d6;stroke-opacity:.65}.number{font:700 30px -apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;fill:#70a5fd}.current{fill:#bf91f3}.label{font:600 14px -apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;fill:#70a5fd}.sub{font:12px -apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;fill:#38bdae}.ring{fill:none;stroke:#70a5fd;stroke-width:7}' +
  '</style>' +
  '<rect class="bg" x=".5" y=".5" width="494" height="194" rx="5"/>' +
  '<line class="divider" x1="165" y1="26" x2="165" y2="169"/>' +
  '<line class="divider" x1="330" y1="26" x2="330" y2="169"/>' +
  '<text class="number" x="82.5" y="83" text-anchor="middle">' + total.toLocaleString('en-US') + '</text>' +
  '<text class="label" x="82.5" y="119" text-anchor="middle">Total Contributions</text>' +
  '<text class="sub" x="82.5" y="151" text-anchor="middle">' + accountRange + '</text>' +
  '<circle class="ring" cx="247.5" cy="73" r="43"/>' +
  '<text class="number current" x="247.5" y="83" text-anchor="middle">' + current + '</text>' +
  '<text class="label current" x="247.5" y="130" text-anchor="middle">Current Streak</text>' +
  '<text class="sub" x="247.5" y="157" text-anchor="middle">' + currentRange + '</text>' +
  '<text class="number" x="412.5" y="83" text-anchor="middle">' + longest + '</text>' +
  '<text class="label" x="412.5" y="119" text-anchor="middle">Longest Streak</text>' +
  '<text class="sub" x="412.5" y="151" text-anchor="middle">' + longestRange + '</text>' +
  '</svg>';

await mkdir('profile', { recursive: true });
await writeFile('profile/streak.svg', svg);
