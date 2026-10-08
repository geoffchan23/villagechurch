// Everything on the site that isn't a sermon lives here.
// Edit text in this file and push — the site rebuilds automatically.

export const church = {
  name: 'Village Church Newcastle',
  shortName: 'Village Church',
  tagline: ['Ordinary People', 'Authentic Faith', 'Family Together'],
  welcome: 'Whoever you are and wherever you are from, you are welcome at Village Church Newcastle.',
  email: 'info@villagechurch.ca',
  phone: '+1 (289) 724-1867',
  phoneHref: 'tel:+12897241867',
  address: {
    venue: 'Newcastle Public School',
    street: '50 Glass Court',
    city: 'Newcastle, ON L1B 1M5',
    mapUrl: 'https://maps.app.goo.gl/vDihn2ogGaJYsmpB6',
  },
  social: {
    facebook: 'https://www.facebook.com/villagechurchnewcastle/',
    instagram: '', // add the handle URL when there is one
  },
  giveUrl: 'https://vision-ministries.org/donate/',
};

export const sunday = {
  time: '10:30 am',
  coffee: '10:10 am',
  summary:
    'We sing, pray, share the Lord’s Supper (communion) and learn together from the Bible. Kids up to Grade 6 head to their own classes after the singing.',
  after: 'Afterwards we hang out over a simple lunch, and kids of all ages make use of the gym.',
};

export const midweek = {
  intro:
    'Through the week we find ourselves in each other’s homes and lives. We’re family and seek to share life together formally and informally.',
  groups: ['Men’s Breakfasts', 'Women’s Coffee', 'Bible Discussion', 'Prayer Meetings', 'Special Events'],
};

export const team = [
  {
    name: 'Brian Jose',
    role: 'Elder',
    photo: 'brian',
    bio: 'Brian’s Newcastle heritage dates back over 200 years, but he and Audrey spent 37 years in Europe before landing in Newcastle in 2017. You might see him driving a school bus around Newcastle.',
  },
  {
    name: 'Helio Rodrigues',
    role: 'Elder',
    photo: 'helio',
    bio: 'Helio, an electrician, was raised in Brazil, and has also lived in Scotland and Albania. He and Nicole moved their family to Newcastle from the UK to help build Village Church.',
    link: { label: 'It’s a “God story”', href: 'https://vision-ministries.org/stories/from-albania-to-scotland-to-canada-village-church-newcastle/' },
  },
  {
    name: 'Greg Reader',
    role: 'Elder',
    photo: 'greg',
    bio: 'Greg hails from Peterborough but has spent seasons of life in Austria and the Philippines. He and Helen share a passion for serving the poor and for refugees.',
  },
  {
    name: 'Nicole Rodrigues',
    role: 'Kids Ministry Director',
    photo: 'nicole',
    bio: 'Nicole was born in Toronto but grew up in Hong Kong and the UK. She is passionate about kids and is currently retraining to serve in early childhood education. She and Helio have two children.',
    link: { label: 'Read her story', href: 'https://vision-ministries.org/stories/love-for-children-village-church-newcastle/' },
  },
] as const;

export const values = [
  {
    title: 'Community',
    body: 'Church is the family of God, beautiful in its Jesus-centered diversity, and remarkable in its inclusion of people from every conceivable background. New life in Christ results in restored and deepening relationships, which are a sign of God’s coming Kingdom.',
  },
  {
    title: 'Scripture',
    body: 'Our faith and practice is grounded on God’s written word. The Bible is ancient truth that is vitally relevant today as it reveals Jesus from cover to cover.',
  },
  {
    title: 'Discipleship',
    body: 'We follow Jesus, learning together from him, and encouraging each other to become more like him in our day-to-day lives.',
  },
  {
    title: 'Mission',
    body: 'In all that we say and do, we aim to share with others the new life that is growing in us because of the death and resurrection of Jesus. We see our time, energy, resources, and partnerships as sacred responsibilities, entrusted to us by Jesus, to be used for the well-being of our neighbours in Newcastle, throughout Canada, and around the world.',
  },
];

export const beliefs = [
  'Village Church Newcastle is rooted in the story of God’s redemptive work in our world.',
  'We follow Jesus Christ, our saviour, and believe that reconciliation to God, one another and creation is fulfilled only in Him.',
  'We take the authority of the Bible very seriously, and find guidance, revelation and comfort there — God’s inspired and infallible message in written form.',
  'We hold to the ancient Christian statements of faith, the Nicene Creed and the Apostles’ Creed.',
];

export const history =
  'Village Church Newcastle was launched in January 2021 when two couples (and one child) met in a living room to worship, seek God together and ask God how we could serve and bless Newcastle, Orono, Newtonville and beyond. We outgrew the house about two years later and now meet at Newcastle Public School.';

export const partners = {
  network: { name: 'Vision Ministries Canada', href: 'https://vision-ministries.org/', note: 'a network of 140 churches' },
  global: [
    { name: 'Radstock Network', href: 'https://www.radstock.org', note: 'our global church family' },
    { name: 'Bright Hope for Tomorrow', href: 'https://www.brighthopefortomorrow.ca/', note: 'addressing extreme poverty' },
  ],
  local: [
    { name: 'Selah House', href: 'https://give-can.keela.co/selah-house', note: 'refugee housing and support' },
    { name: 'Clarington East Food Bank', href: 'https://claringtoneastfoodbank.ca/', note: 'feeding neighbours in need' },
  ],
};

export const kids = {
  intro:
    'We love kids! Village Church has a children’s program for ages 4 to 12 and nursery facilities for ages 0 to 4. We aim to help young people discover God’s goodness and kindness, and to grow into all He wants them to become.',
  safety: 'Child protection is a high priority — our policies are available upon request.',
  groups: [
    { name: 'Nursery', ages: 'Ages 0–4', body: 'Nursery facilities for our youngest during the Sunday gathering.' },
    { name: 'Kids Church', ages: 'Ages 4–12', body: 'After the singing, kids up to Grade 6 head to their own classes to learn about God together.' },
  ],
};

export const care =
  'We all experience needs for pastoral care and spiritual support at different times in our lives. At Village Church we want to help you quickly assess care and pastoral counselling needs and connect you to the right resources for your situation. Whatever your situation, give us a call and we will be happy to connect with you right away.';

export const giving =
  'Until our registration process with the CRA is complete, giving to Village Church Newcastle is managed by Vision Ministries Canada. Please specify that your gift is for Village Church Newcastle. Tax-deductible receipts will be issued at tax time by Vision Ministries Canada.';

export const nav = [
  { label: 'About', href: '/about/' },
  { label: 'Kids', href: '/kids/' },
  { label: 'Sermons', href: '/sermons/' },
  { label: 'Give', href: '/give/' },
];

// Floating theme switcher for design feedback. Set to false once a theme is chosen.
export const showThemePicker = true;
