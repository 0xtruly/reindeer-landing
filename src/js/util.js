const menuItem = [
  {
    title: 'Dashboard',
    url: '#',
  },
  {
    title: 'Pull requests',
    url: '#',
  },
  {
    title: 'Issues',
    url: '#',
  },
  {
    title: 'Marketplace',
    url: '#',
  },
  {
    title: 'Explore',
    url: '#',
  },
];

const navMenu = document.querySelector('.navbar-nav');

const mediaTablet = window.matchMedia('(min-width: 768px)');

console.log('mediaTablet', mediaTablet);

(() => {
  for (let i = 0; i < menuItem.length; i += 1) {
    let navItem = document.createElement('li');
    let navLink = document.createElement('a');
    navItem.classList = 'nav-item';
    navLink.classList = 'nav-link';
    navLink.href = menuItem[i].url;
    navLink.textContent = menuItem[i].title;
    navItem.appendChild(navLink);
    navMenu.appendChild(navItem);
  }
})();

const setMenuItemsByMedia = (mediaType) => {
  if (mediaType.matches) {
    navMenu.children[1].firstChild.textContent = 'Pulls';
    navMenu.removeChild(navMenu.children[0]);
  }
};

setMenuItemsByMedia(mediaTablet);

export const formatDate = (date) => {
  const currentDate = new Date().getFullYear();
  console.log('currentDate', currentDate);
  // Convert date value to date string
  const dateString = new Date(date).toDateString();
  let arrayOfDateValue = dateString.split(' ');
  arrayOfDateValue.shift();

  if (Number(arrayOfDateValue[arrayOfDateValue.length - 1]) === Number(currentDate)) {
    arrayOfDateValue.pop();
  }
  return arrayOfDateValue.join(' ');
};
