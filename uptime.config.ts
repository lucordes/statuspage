import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  // Title for your status page
  title: "Luca's Status Page",
  // Links shown at the header of your status page, could set `highlight` to `true`
  links: [
    { link: 'https://github.com/lucordes', label: 'GitHub' },
    { link: 'https://notes.lucacordes.com/', label: 'Blog' },
    { link: 'mailto:lucacordes@lucacordes.com', label: 'Email Me', highlight: true },
  ],
  // [OPTIONAL] Group your monitors
  // If not specified, all monitors will be shown in a single list
  // If specified, monitors will be grouped and ordered, not-listed monitors will be invisble (but still monitored)
  group: {
    '🌐 Public': ['launchpage', 'overleaf', 'notes','git'],
    '🔐 Private': ['vscode','vps','vaultwarden','photos','analytics','webdav','budget'],
  },
}

const workerConfig: WorkerConfig = {
  // Write KV at most every 3 minutes unless the status changed
  kvWriteCooldownMinutes: 3,
  // Enable HTTP Basic auth for status page & API by uncommenting the line below, format `<USERNAME>:<PASSWORD>`
  // passwordProtection: 'username:password',
  // Define all your monitors here
  monitors: [
    // Example HTTP Monitor
    {
      
      id: 'launchpage',
      name: 'My Lauchpage',
      method: 'POST',
      target: 'https://www.lucacordes.com',
      tooltip: 'The root page of a domain is called Lauchpange!',
      statusPageLink: 'https://www.lucacordes.com',
      hideLatencyChart: false,
      checkProxy: 'worker://weur'
      // [OPTIONAL] headers to be sent
      // headers: {
      //   'User-Agent': 'Uptimeflare',
      //   Authorization: 'Bearer YOUR_TOKEN_HERE',
      // },
      // // [OPTIONAL] body to be sent
      // body: 'Hello, world!',
      // // [OPTIONAL] if specified, the response must contains the keyword to be considered as operational.
      // responseKeyword: 'success',
      // // [OPTIONAL] if specified, the response must NOT contains the keyword to be considered as operational.
      // responseForbiddenKeyword: 'bad gateway',
      // // [OPTIONAL] if specified, will call the check proxy to check the monitor, mainly for geo-specific checks
      // // refer to docs https://github.com/lyc8503/UptimeFlare/wiki/Check-proxy-setup before setting this value
      // // currently supports `worker://` and `http(s)://` proxies
      // checkProxy: 'https://xxx.example.com OR worker://weur',
      // // [OPTIONAL] if true, the check will fallback to local if the specified proxy is down
      // checkProxyFallback: true,
    },
    // Example TCP Monitor
    {
      id: 'overleaf',
      name: 'Overleaf',
      method: 'GET',
      target: 'https://overleaf.lucacordes.com/login',
      tooltip: 'Writing all the documents!',
      statusPageLink: 'https://overleaf.lucacordes.com',
      hideLatencyChart: false,
      checkProxy: 'worker://weur'
    },
    {
      id: 'notes',
      name: 'My Notes',
      method: 'POST',
      target: 'https://notes.lucacordes.com',
      tooltip: 'Public part of my diary!',
      statusPageLink: 'https://notes.lucacordes.com',
      hideLatencyChart: false,
      checkProxy: 'worker://weur'
    },
    {
      id: 'analytics',
      name: 'Analytics',
      method: 'POST',
      target: 'https://analytics.lucacordes.com/user/new',
      tooltip: 'Count your goats!',
      statusPageLink: 'https://analytics.lucacordes.com',
      hideLatencyChart: false,
      expectedCodes: [405],
      checkProxy: 'worker://weur'
    },
    {
      id: 'git',
      name: 'Gitea',
      method: 'GET',
      target: 'https://git.lucacordes.com',
      tooltip: 'It is like github!',
      statusPageLink: 'https://git.lucacordes.com',
      hideLatencyChart: false,
      checkProxy: 'worker://weur'
    },
    {
      id: 'webdav',
      name: 'webdav',
      method: 'POST',
      target: 'https://webdav.lucacordes.com',
      tooltip: 'Cloud!',
      hideLatencyChart: false,
      expectedCodes: [401],
      checkProxy: 'worker://weur'
    },
    {
      id: 'photos',
      name: 'Photos',
      method: 'GET',
      target: 'https://photos.lucacordes.com',
      tooltip: 'Photos!',
      hideLatencyChart: false,
      checkProxy: 'worker://weur'
    },
    {
      id: 'vscode',
      name: 'VS code server',
      method: 'GET',
      target: 'https://vscode.lucacordes.com/login',
      tooltip: 'It is a decent editor!',
      hideLatencyChart: false,
      checkProxy: 'worker://weur'
    },
    {
      id: 'vps',
      name: 'VPS',
      method: 'GET',
      target: 'https://nginxstrato.lucacordes.com/',
      tooltip: 'My VPS!',
      hideLatencyChart: false,
      checkProxy: 'worker://weur'
    },
    {
      id: 'vaultwarden',
      name: 'Vaultwarden',
      method: 'GET',
      target: 'https://vaultwarden.lucacordes.com',
      tooltip: 'My secure passwords!',
      hideLatencyChart: false,
      checkProxy: 'worker://weur'
    },
    {
      id: 'budget',
      name: 'Actual Budget',
      method: 'GET',
      target: 'https://budget.lucacordes.com/',
      tooltip: 'My Money!',
      hideLatencyChart: false,
      checkProxy: 'worker://weur'
    },
  ],
  notification: {
    // [Optional] apprise API server URL
    // if not specified, no notification will be sent
    //appriseApiServer: 'https://apprise.example.com/notify',
    // [Optional] recipient URL for apprise, refer to https://github.com/caronc/apprise
    // if not specified, no notification will be sent
    //recipientUrl: 'tgram://bottoken/ChatID',
    // [Optional] timezone used in notification messages, default to "Etc/GMT"
    //timeZone: 'Europe/Amsterdam',
    // [Optional] grace period in minutes before sending a notification
    // notification will be sent only if the monitor is down for N continuous checks after the initial failure
    // if not specified, notification will be sent immediately
    //gracePeriod: 5,
    // [Optional] disable notification for monitors with specified ids
    //skipNotificationIds: ['foo_monitor', 'bar_monitor'],
  },
  callbacks: {
    onStatusChange: async (
      env: any,
      monitor: any,
      isUp: boolean,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // This callback will be called when there's a status change for any monitor
      // Write any Typescript code here
      // This will not follow the grace period settings and will be called immediately when the status changes
      // You need to handle the grace period manually if you want to implement it
    },
    onIncident: async (
      env: any,
      monitor: any,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // This callback will be called EVERY 1 MINTUE if there's an on-going incident for any monitor
      // Write any Typescript code here
    },
  },
}

// You can define multiple maintenances here
// During maintenance, an alert will be shown at status page
// Also, related downtime notifications will be skipped (if any)
// Of course, you can leave it empty if you don't need this feature
// const maintenances: MaintenanceConfig[] = []
const maintenances: MaintenanceConfig[] = [
  {
    // [Optional] Monitor IDs to be affected by this maintenance
    monitors: ['foo_monitor', 'bar_monitor'],
    // [Optional] default to "Scheduled Maintenance" if not specified
    title: 'Test Maintenance',
    // Description of the maintenance, will be shown at status page
    body: 'This is a test maintenance, server software upgrade',
    // Start time of the maintenance, in UNIX timestamp or ISO 8601 format
    start: '2025-04-27T00:00:00+08:00',
    // [Optional] end time of the maintenance, in UNIX timestamp or ISO 8601 format
    // if not specified, the maintenance will be considered as on-going
    end: '2025-04-30T00:00:00+08:00',
    // [Optional] color of the maintenance alert at status page, default to "yellow"
    color: 'blue',
  },
]

// Don't forget this, otherwise compilation fails.
export { pageConfig, workerConfig, maintenances }
