/* Original vector concept covers; these are illustrations, not product screenshots. */
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..', 'assets', 'projects');
const star = (x,y,size=32,fill='#e9b751') => `<path transform="translate(${x} ${y}) scale(${size/100})" d="M0-100 28-32 100-22 48 25 62 100 0 62-62 100-48 25-100-22-28-32Z" fill="${fill}"/>`;
const wrap = (bg,body) => `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720"><rect width="1280" height="720" fill="${bg}"/>${body}</svg>`;
const text = (x,y,value,size=38,color='#354b3e',weight=700) => `<text x="${x}" y="${y}" font-family="Trebuchet MS, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}">${value}</text>`;
const covers = {
  invest: wrap('#e3ecd8', `
    <circle cx="1070" cy="165" r="100" fill="#f2d47d"/><path d="M0 620Q240 430 450 560T850 520T1280 470V720H0Z" fill="#c4d6b6"/>
    <path d="M0 674Q245 520 505 625T970 550T1280 570V720H0Z" fill="#b1c99e"/>
    ${text(82,118,'NEBUBU',21,'#627958')}${text(80,205,'Invest',79)}${text(84,254,'A clearer view. A calmer mind.',20,'#627958',400)}
    <path d="M210 540C345 540 340 430 460 430S580 470 660 355 770 375 850 265" fill="none" stroke="#3c7055" stroke-width="28" stroke-linecap="round"/>
    <path d="m796 270 68-35 16 76" fill="none" stroke="#3c7055" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse cx="986" cy="590" rx="110" ry="19" fill="#94b185"/>
    <path d="M935 575q-18-78-8-105h108q11 35-10 105Z" fill="#df9363"/>
    <path d="M980 469q-3-70 17-125" stroke="#567b4b" stroke-width="13" fill="none" stroke-linecap="round"/>
    <path d="M990 407q-94 1-94-76 85-10 94 76M995 382q-6-95 77-105 14 83-77 105" fill="#5e8d65"/>
    ${star(1110,379,24)}${star(600,142,13,'#6d946d')}
  `),
  diary: wrap('#f2e3db', `
    <circle cx="1060" cy="175" r="110" fill="#edc5b1"/>${text(82,117,'NEBUBU',21,'#8d6c60')}${text(80,200,'Diary',79,'#684d43')}${text(84,249,'Every decision has a story.',20,'#8d6c60',400)}
    <g transform="translate(675 402) rotate(-8)"><ellipse cx="0" cy="155" rx="295" ry="30" fill="#debdad"/>
    <path d="M-285-105Q-140-145 0-91Q140-145 285-105V162Q140 125 0 166Q-140 125-285 162Z" fill="#d69e85"/>
    <path d="M-273-130Q-140-165 0-115Q140-165 273-130V134Q140 100 0 142Q-140 100-273 134Z" fill="#fcf5e8"/>
    <path d="M0-113V140" stroke="#dac9b2" stroke-width="3"/>
    <path d="M-220-70h140m-140 30h165m-165 30h135m-135 75h165m-165 30h120" stroke="#b4ad99" stroke-width="9" stroke-linecap="round"/>
    <g fill="#d7dfc1"><rect x="48" y="-68" width="45" height="42" rx="9"/><rect x="112" y="-68" width="45" height="42" rx="9"/><rect x="176" y="-68" width="45" height="42" rx="9"/><rect x="48" y="-8" width="45" height="42" rx="9"/><rect x="176" y="-8" width="45" height="42" rx="9"/><rect x="48" y="52" width="45" height="42" rx="9"/><rect x="112" y="52" width="45" height="42" rx="9"/></g>
    <rect x="112" y="-8" width="45" height="42" rx="9" fill="#d78564"/><path d="m124 10 9 9 15-17" fill="none" stroke="#fcf5e8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15 125v65l20-12 20 12v-69" fill="#6f9474"/>
    </g>${star(1040,414,60)}${star(290,390,23,'#cd8d72')}${star(1110,540,17,'#cd8d72')}
  `),
  asset: wrap('#f5e9bd', `
    ${text(82,117,'LITTLE TOOLS',21,'#8e7d45')}${text(80,197,'Asset',78,'#625534')}${text(82,272,'Calculator',61,'#625534')}
    <ellipse cx="815" cy="610" rx="240" ry="24" fill="#dfd19d"/>
    <g transform="translate(835 352) rotate(10)"><rect x="-160" y="-231" width="320" height="470" rx="54" fill="#ce9d5c"/><rect x="-160" y="-246" width="320" height="470" rx="54" fill="#e8bd79"/>
    <rect x="-122" y="-195" width="244" height="100" rx="21" fill="#f7f1d6"/>${text(-11,-125,'127',56,'#5a644d')}
    <g fill="#fbf4dd"><rect x="-122" y="-58" width="64" height="64" rx="19"/><rect x="-32" y="-58" width="64" height="64" rx="19"/><rect x="58" y="-58" width="64" height="64" rx="19"/><rect x="-122" y="29" width="64" height="64" rx="19"/><rect x="-32" y="29" width="64" height="64" rx="19"/><rect x="-122" y="116" width="64" height="64" rx="19"/><rect x="-32" y="116" width="64" height="64" rx="19"/></g>
    <rect x="58" y="29" width="64" height="151" rx="19" fill="#657c5b"/><path d="M76 97h28m-28 17h28" stroke="#faf3dd" stroke-width="7" stroke-linecap="round"/>
    </g><g fill="#e3b363"><ellipse cx="430" cy="570" rx="72" ry="27"/><path d="M358 548v23q72 39 144 0v-23"/><ellipse cx="430" cy="545" rx="72" ry="27" fill="#edc77e"/><path d="M370 518v23q60 36 120 0v-23"/><ellipse cx="430" cy="514" rx="60" ry="23" fill="#f7d994"/></g>
    ${star(1100,220,26,'#cc8d4e')}${star(480,370,17,'#cc8d4e')}
  `),
  api: wrap('#e0e9ec', `
    ${text(82,117,'NEBUBU',21,'#627882')}${text(80,202,'API',84,'#365661')}${text(84,253,'Connect an idea to something real.',20,'#627882',400)}
    <path d="M350 452h160q70 0 70-73t70-73h145" fill="none" stroke="#d98154" stroke-width="20" stroke-linecap="round"/>
    <g transform="translate(325 437)"><ellipse cx="0" cy="100" rx="148" ry="22" fill="#c4d5db"/>
    <path d="M-112 33q-55-68 13-96 1-110 106-90 68-29 102 48 91 1 83 74-4 69-83 69h-167Z" fill="#faf5e9"/>
    ${text(-56,-7,'{ }',79,'#527c89')}
    </g><g transform="translate(895 298)"><ellipse cx="0" cy="148" rx="156" ry="22" fill="#c4d5db"/>
    <path d="M-116 64q-72-52-14-106 12-21 44-20 3-112 107-97 84-19 102 65 81-1 80 76 4 79-97 82Z" fill="#faf5e9"/>
    <circle cx="-29" cy="-8" r="8" fill="#4c6c72"/><circle cx="31" cy="-8" r="8" fill="#4c6c72"/><path d="M-12 16q13 17 26 0" fill="none" stroke="#4c6c72" stroke-width="5" stroke-linecap="round"/>
    </g>${star(1010,546,36)}${star(602,176,17,'#70979e')}${star(1100,175,14,'#70979e')}
  `)
};
for (const [name, svg] of Object.entries(covers)) fs.writeFileSync(path.join(root, `${name}.svg`), svg);
console.log('Four original concept covers written.');
