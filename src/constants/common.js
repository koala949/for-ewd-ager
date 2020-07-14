export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';
export const DEFAULT_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const urlCollect = [
  ['Rancher集群', 'https://10.74.20.160:8443/'],
  ['MFA测试环境', 'http://mfafront.mfa.10.74.20.167.nip.io/'],
  ['MFA开发环境', 'http://mfafront.mfa-debug.10.74.20.167.nip.io/'],
  ['MFA iot版本开发环境', 'http://mfafront.mfa-iot.10.74.20.167.nip.io/'],
  ['虚拟量测测试环境', 'http://vmfront.vm.10.74.20.167.nip.io/'],
  ['团队文档', 'http://showdoc.showdoc.10.74.20.167.nip.io/', 1],
  ['团队日报', 'http://10.74.20.123:8090/pages/viewpage.action?pageId=18317332'],
  ['团队云盘', 'http://minio.minio.10.74.20.167.nip.io/'],
];

// export const teamUrl = [
//   ['团队文档', 'http://showdoc.showdoc.10.74.20.167.nip.io/'],
//   ['团队日报', 'http://10.74.20.123:8090/pages/viewpage.action?pageId=18317332'],
//   ['团队云盘', 'http://minio.minio.10.74.20.167.nip.io/'],
// ];

export const configInfo = [
  {
    title: 'mfa csot环境',
    paramList: [
      {
        name: 'mysql',
        list: [
          ['ip', '10.74.20.167'],
          ['port', '32417'],
          ['user', 'root'],
          ['pwd', 'LBH2vmiEBN'],
        ],
      },
      {
        name: 'redis',
        list: [
          ['ip', '10.74.20.167'],
          ['port', '31897'],
          ['pwd', '80auOhk8cV'],
        ],
      },
    ],
  },
  {
    title: 'mfa iot环境',
    paramList: [
      {
        name: 'mysql',
        list: [
          ['ip', '10.74.20.167'],
          ['port', '32133'],
          ['user', 'root'],
          ['pwd', 'LBH2vmiEBN'],
        ],
      },
      {
        name: 'redis',
        list: [
          ['ip', '10.74.20.167'],
          ['port', '32614'],
          ['pwd', 'rGUP6MGua'],
        ],
      },
    ],
  },
  {
    title: '通用',
    paramList: [
      {
        name: 'minio（云盘）',
        list: [
          ['accesskey', 'QUtJQUlPU0ZPRE5ON0VYQU1QTEU='],
          ['secretkey', 'd0phbHJYVXRuRkVNSS9LN01ERU5HL2JQeFJmaUNZRVhBTVBMRUtFWQ=='],
        ],
      },
    ],
  },
];
