import axios from 'axios';
import moment from 'moment';
import dayjs from 'dayjs';
import { formatDate } from './util';

const GET_REPOSITORY = `
query {
  viewer {
    login
    bio
    avatarUrl(size: 400)
    email
    createdAt
    followers {
      totalCount
    }
    following {
      totalCount
    }
    name
    repositories(affiliations: OWNER, first: 20, orderBy: {field: CREATED_AT, direction: ASC}) {
      nodes {
        name
        description
        pushedAt
        forkCount
        homepageUrl
        id
        primaryLanguage {
          color
          id
          name
        }
        licenseInfo {
          name
        }
        stargazerCount
        url
        parent {
          nameWithOwner
          name
          forkCount
        }
      }
      totalCount
    }
    status {
      emoji
      createdAt
      message
      emojiHTML
    }
    websiteUrl
    starredRepositories {
      totalCount
    }
  }
}

`;

const loadRepositories = async () => {
  try {
    const req = await axios({
      url: 'https://api.github.com/graphql',
      method: 'POST',
      headers: {
        Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      },
      data: {
        query: GET_REPOSITORY,
      },
    });
    console.log('req', req);

    if (req.status === 200) {
      const {
        data: { viewer },
      } = req.data;
      await saveResponseDate(viewer);
    }
  } catch (e) {
    console.log('e', e.message);
  }
};
window.onload = loadRepositories();

const saveResponseDate = (data) => {
  console.log('data', data);
  const {
    status,
    followers,
    following,
    starredRepositories,
    repositories: { nodes, totalCount },
    avatarUrl,
    bio,
    login,
    name,
    websiteUrl,
  } = data;

  let emojiUrl = status.emojiHTML.split('=')[3];
  emojiUrl = emojiUrl.split('>')[0];
  emoji.src = emojiUrl.slice(1, -1);
  userStatusIcon.appendChild(emoji);
  userStatusMessage.textContent = status.message;
  console.log('nodes', nodes);
  img.src = avatarUrl;
  profileAvatar.appendChild(img);
  p.textContent = name;
  span.textContent = login;
  bioText.textContent = bio;
  followersCount.textContent = followers.totalCount;
  followingCount.textContent = following.totalCount;
  starredCount.textContent = starredRepositories.totalCount;

  nodes.map((node) => {
    const {
      description,
      forkCount,
      homepageUrl,
      id,
      licenseInfo,
      name,
      primaryLanguage,
      pushedAt,
      stargazerCount,
      url,
    } = node;

    const today = dayjs(new Date()).format('YYYY-MM-DD');
    const lastUpdatedDate = dayjs(pushedAt).format('YYYY-MM-DD');
    const timeDiff = dayjs(today).diff(dayjs(lastUpdatedDate), 'day');
    let updatedTime =
      timeDiff <= 30
        ? moment(pushedAt).startOf('day').fromNow()
        : timeDiff > 30 && timeDiff <= 360
        ? moment(pushedAt).format('D MMM')
        : timeDiff > 360
        ? moment(pushedAt).format('D MMM YYYY')
        : '';
        let list = `
              <li className="repo-card d-flex">
                <div className="left-col col-10">
                  <div className="repo-name">
                    <h3 className="h-3 text-bold">
                    <a href="#" className="name">${name}</a>
                    </h3>
                  </div>
                  <div className="repo-description">
                    <p className="mr-10 text-light">${description}</p>
                  </div>
                  <div className="meta">
                    ${
                      primaryLanguage &&
                      `
                      <span class="" style="background-color:${primaryLanguage.color || null};"></span>
                      <p className="">${primaryLanguage.name}</p>
                    `
                    }
                    
                  </div>
                </div>
                <div className="right-col col-10">
                </div>
              </li>
        `;
  });

};

let img = document.createElement('img');
let span = document.createElement('span');
let p = document.createElement('p');
p.classList.add('name', 'text-bold');
span.classList.add('username', 'text-light');
let profileAvatar = document.querySelector('.profile-avatar');
let name = document.querySelector('.name');
name.appendChild(p);
name.appendChild(span);
let username = document.querySelector('.username');
const userStatusIcon = document.querySelector('.status-icon');
const userStatusMessage = document.querySelector('.message');
let emoji = document.createElement('img');
const bioText = document.querySelector('.bio-text');
const followersCount = document.querySelector('.followers-count');
const followingCount = document.querySelector('.following-count');
const starredCount = document.querySelector('.starred-count');

// Repository list
const repositories = document.querySelector('.repositories');
let repoItem = document.createElement('li');
repoItem.classList.add('repo-card', 'd-flex');
let leftCol = document.createElement('div');
leftCol.classList.add('left-col', 'col-10');
let rightCol = document.createElement('div');
rightCol.classList = 'col-2';

const repoNameDiv = document.createElement('div');
repoNameDiv.classList = 'repo-name';
const repoName = document.createElement('h3');
repoName.classList.add('h-3', 'text-bold');
const repoDescriptionDiv = document.createElement('div');
repoDescriptionDiv.classList = 'repo-description';
const repoMeta = document.createElement('div');
repoMeta.classList.add('d-flex', 'repo-meta');
const repoDescription = document.createElement('p');
repoDescription.classList.add('mr-10', 'text-light');
const repoForkCount = document.createElement('div');
const languageColor = document.createElement('span');
const languageName = document.createElement('div');
languageName.classList.add('text-light');
const repoUpdatedAt = document.createElement('div');
repoUpdatedAt.classList.add('text-light');

// (() => {
//   loadRepositories()
//     .then((response) => {
//       const { user } = response.data.data;
//       const {
//         status,
//         followers,
//         following,
//         starredRepositories,
//         repositories: { nodes },
//       } = user;
//       // await Promise.all(
//       nodes.map((node) => {
//         const { description, forkCount, languages, pushedAt, url } = node;
//         const languageProp = { langColor: '', langName: '' };
//         if (languages.length > 0) {
//           languageProp.langName = languages.nodes[0].name;
//           languageProp.langColor = languages.nodes[0].color;
//         }

//         const today = dayjs(new Date()).format('YYYY-MM-DD');
//         const lastUpdatedDate = dayjs(pushedAt).format('YYYY-MM-DD');
//         const timeDiff = dayjs(today).diff(dayjs(lastUpdatedDate), 'day');
//         let updatedTime =
//           timeDiff <= 30
//             ? moment(pushedAt).startOf('day').fromNow()
//             : timeDiff > 30 && timeDiff <= 360
//             ? moment(pushedAt).format('D MMM')
//             : timeDiff > 360
//             ? moment(pushedAt).format('D MMM YYYY')
//             : '';
//         console.log(node.name, updatedTime);
//         // console.log(node.name, timeDiff);
//         repoName.textContent = node.name;
//         repoDescription.textContent = description;
//         repoForkCount.textContent = forkCount;
//         repoUpdatedAt.textContent = updatedTime;
//         languageColor.style.color = languageProp.langColor;
//         languageName.textContent = languageProp.langName;
//         repoDescriptionDiv.appendChild(repoDescription);
//         repoNameDiv.appendChild(repoName);
//         leftCol.innerHTML = repoNameDiv.outerHTML + repoDescriptionDiv.outerHTML;
//         repoItem.innerHTML = leftCol.outerHTML;
//         repositories.innerHTML += repoItem.outerHTML;
//       });
//       // )
//     })
//     .catch((error) => console.log('error', error));
// })();
