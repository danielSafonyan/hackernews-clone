export default function Story(story) {
    const { index, title, url, domain, points, user, time_ago, comments_count, id}  = story
  return `
    <div class="story">
      <div> 
        <span class="gray">${index}</span>
        <span class="upvote">▲</span>
        <a href="${url}">${title}</a>
        <span>(${domain})</span>
      </div>
      <div>
        <div class="gray">
          ${points} points by ${user} ${time_ago}
          |
          <a href="#/item?id=${id}">
            ${comments_count} comments
          </a>
          |
          <span class="favorite">
            <i class="fa-regular fa-heart"></i> Add To Favorites
          </span>
        </div>
      </div>
    </div>
  `;  
}