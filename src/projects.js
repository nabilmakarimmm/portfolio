export const videos = [
  { id: 'surabaya', title: 'Surabaya in Motion', duration: '0:54', format: 'Landscape', description: 'A city montage that cuts from bus interiors and busy roads to public squares and night street scenes.' },
  { id: 'jakarta', title: 'Jakarta', duration: '0:16', format: 'Landscape', description: 'An elevated night shot holds on the traffic while the billboards change and the city title appears.' },
  { id: 'alphaleos', title: 'Alphaleos', duration: '0:24', format: 'Vertical', description: 'A vertical campus montage with a PWK ITS opening title and quick cuts between portraits and group activities.' },
  { id: 'editing-test', title: 'Editing Test', duration: '0:56', format: 'Vertical', description: 'A talking-head edit with word-by-word captions, changes in camera angle, and graphic cutaways.' },
];

export const maps = [
  {
    id: 'kdb', label: 'KDB', title: 'Building coverage ratio', localTitle: 'Koefisien Dasar Bangunan',
    description: 'The proportion of a site that a building footprint occupies.',
    reading: 'The deepest red bands cluster immediately around several building parcels, while large open areas are yellow.',
    bands: [['0%', '#ffff83'], ['0–18%', '#f6bd48'], ['18–27%', '#c56b1a'], ['Above 27%', '#750f04']],
  },
  {
    id: 'kdh', label: 'KDH', title: 'Green space ratio', localTitle: 'Koefisien Dasar Hijau',
    description: 'The share of a site allocated to landscaped or green open space.',
    reading: 'The darkest green appears in larger areas around the sports facilities and marks the highest green space band.',
    bands: [['Below 70%', '#d7f1e7'], ['70–80%', '#96c2a6'], ['80–90%', '#558b61'], ['Above 90%', '#206638']],
  },
  {
    id: 'klb', label: 'KLB', title: 'Floor area ratio', localTitle: 'Koefisien Lantai Bangunan',
    description: 'The ratio of total building floor area to site area.',
    reading: 'The highest floor area band appears along parts of the circular building parcel near the lower edge of the study area.',
    bands: [['0', '#379f04'], ['0–0.18', '#a4d900'], ['0.18–0.27', '#ffac06'], ['Above 0.27', '#fd1716']],
  },
];
